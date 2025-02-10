import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { d1Client } from "./utils/d1";
import { Turnstile } from "./utils/turnstile";
import { getConnInfo } from "hono/cloudflare-workers";
import { sha256 } from "hono/utils/crypto";

app.post("/destroy",c=>{
  if(c.req.raw.cf?.country !== "JP") throw new HTTPException(400, { message: "日本国外IPから削除できません。" });
  return c.req.json<{ts: string, token: string, pass: string}>()
  .catch(()=>{throw new HTTPException(400, { message: "無効なJSON" })})
  .then(async body=>{
    if(typeof body !== "object" ||
      typeof body.ts !== "string" ||
      typeof body.token !== "string" ||
      typeof body.pass !== "string")
        throw new HTTPException(400, { message: "無効なJSON形式" });
    const ihash_promise = sha256(body.pass);
    
    await Turnstile(c, body.ts);
    const d1 = d1Client(c);
    const vd = await d1("SELECT pass FROM ballot_boxes WHERE token = ?", [body.token]);
    const data = vd.results?.[0] as {pass: string};
    if(!data) throw new HTTPException(400, { message: "その投票先は存在しません。" })
    const vdelres = await d1("DELETE FROM ballot_boxes WHERE token = ? AND pass = ?", [body.token, await ihash_promise ?? ""]);
    console.log(vdelres);
    if(!vdelres.results?.length)
      throw new HTTPException(400, { message: "パスワードが違います。" })
    await d1("DELETE FROM votes WHERE token = ?", [body.token]);
    return c.text("");
  })
})
