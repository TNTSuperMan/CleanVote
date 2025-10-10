import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { d1Client } from "./utils/d1";
import { sha256 } from "hono/utils/crypto";
import { CheckAndIP } from "./utils/check";
import * as z from "@zod/mini";
import { parseReq } from "./utils/parseReq";

const adminReqBody = z.object({
  token: z.string(),
  pass: z.string()
})

app.post("/admin", async c => {
  CheckAndIP(c);
  const body = await parseReq(c.req, adminReqBody);

  const ihash_promise = sha256(body.pass);
  
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
