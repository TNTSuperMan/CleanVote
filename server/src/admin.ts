import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { d1Client } from "./utils/d1";
import { Turnstile } from "./utils/turnstile";
import { sha256 } from "hono/utils/crypto";
import { CheckAndIP } from "./utils/check";

app.post("/admin", c => {
  CheckAndIP(c);
  return c.req.json<{ts: string, token: string, pass: string}>()
  .catch(()=>{ throw new HTTPException(400, { message: "無効なJSON" }) })
  .then(async body=>{
    if(
      typeof body !== "object" ||
      typeof body.ts !== "string" ||
      typeof body.token !== "string" ||
      typeof body.pass !== "string")
        throw new HTTPException(400, { message: "無効なJSON形式" })
    const ihash_promise = sha256(body.pass);
    
    await Turnstile(c, body.ts);
    const d1 = d1Client(c);
    const voteq = await d1(
      'SELECT pass FROM ballot_boxes WHERE token = ?',
      [body.token])
    const data = voteq.results?.[0] as {pass: string};
    if(!data) throw new HTTPException(400, { message: "その投票先は見つかりませんでした" })
    if(data.pass !== await ihash_promise) throw new HTTPException(400, { message: "パスワードが違います。" })
    else{
      const [votes, data] = await Promise.all([d1(
        'SELECT option, count FROM votes WHERE token = ?',
        [body.token]
      ), d1("SELECT title, description, options FROM ballot_boxes WHERE token = ?",
        [body.token])])
      return c.json({votes:votes.results,data:data.results?.[0]});
    }
  })
})
