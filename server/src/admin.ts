import { HTTPException } from "hono/http-exception";
import { app } from "./app";
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

  const hash = await sha256(body.pass);
  
  const box = await c.env.DB
    .prepare('SELECT pass FROM ballot_boxes WHERE token = ?')
    .bind(body.token)
    .first<{ pass: string }>();
  if(!box) {
    throw new HTTPException(400, { message: "その投票先は見つかりませんでした" });
  }
  if(box.pass !== hash) {
    throw new HTTPException(400, { message: "パスワードが違います。" });
  }
  else{
    const [votes, data] = await Promise.all([
      c.env.DB
        .prepare('SELECT option, count FROM votes WHERE token = ?')
        .bind(body.token)
        .all(),
      c.env.DB
        .prepare('SELECT title, description, options FROM ballot_boxes WHERE token = ?')
        .bind(body.token)
        .first(),
    ]);
    return c.json({ votes, data });
  }
});
