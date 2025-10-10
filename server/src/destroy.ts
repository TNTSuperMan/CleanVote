import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { sha256 } from "hono/utils/crypto";
import { CheckAndIP } from "./utils/check";
import * as z from "@zod/mini";
import { parseReq } from "./utils/parseReq";

const destroyReqBody = z.object({
  token: z.string(),
  pass: z.string(),
});

app.post("/destroy", async c => {
  CheckAndIP(c);
  const body = await parseReq(c.req, destroyReqBody);
  
  const pass_hash = await sha256(body.pass) ?? "";

  const result = await c.env.DB
    .prepare('DELETE FROM ballot_boxes WHERE token = ? AND pass = ?')
    .bind(body.token, pass_hash)
    .run();
  if(!result.meta?.changes) {
    throw new HTTPException(400, { message: "投票先またはパスワードが違います。" });
  } else {
    await c.env.DB.batch([
      c.env.DB.prepare('DELETE FROM votes WHERE token = ?').bind(body.token),
    ]);
    return c.text("");
  }
});
