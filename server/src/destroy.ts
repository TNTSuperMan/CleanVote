import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { d1Client } from "./utils/d1";
import { sha256 } from "hono/utils/crypto";
import { CheckAndIP } from "./utils/check";
import { z } from "zod";
import { parseReq } from "./utils/parseReq";

const destroyReqBody = z.object({
  token: z.string(),
  pass: z.string()
});

app.post("/destroy",c=>{
  CheckAndIP(c);
  return c.req.text().then(async b=>{
    const body = parseReq(b, destroyReqBody);
    
    const ihash_promise = sha256(body.pass);
    
    const d1 = d1Client(c);
    const vd = await d1("SELECT pass FROM ballot_boxes WHERE token = ?", [body.token]);
    const data = vd.results?.[0] as {pass: string};
    if(!data) throw new HTTPException(400, { message: "その投票先は存在しません。" })
    const vdelres = await d1("DELETE FROM ballot_boxes WHERE token = ? AND pass = ?", [body.token, await ihash_promise ?? ""]);
    console.log(vdelres);
    if(!vdelres.meta?.changes)
      throw new HTTPException(400, { message: "パスワードが違います。" })
    await d1("DELETE FROM votes WHERE token = ?", [body.token]);
    return c.text("");
  })
})
