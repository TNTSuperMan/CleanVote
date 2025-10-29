import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { sha256 } from "hono/utils/crypto";
import { CheckAndIP } from "./utils/check";
import * as z from "@zod/mini";
import { parseReq } from "./utils/parseReq";
import { isEqualHash } from "./utils/eqPass";

const destroyReqBody = z.object({
  token: z.string(),
  pass: z.string(),
});

app.post("/destroy", async c => {
  CheckAndIP(c);
  const body = await parseReq(c.req, destroyReqBody);
  
  const pass_hash = await sha256(body.pass);

  const box = await c.env.DB
    .prepare('SELECT pass FROM ballot_boxes WHERE token = ?')
    .bind(body.token)
    .first<{ pass: string }>();
  let forbiddenFlag = false;

  if (!box) forbiddenFlag = true;
  if (!isEqualHash(pass_hash, box?.pass ?? null)) forbiddenFlag = true;

  if (forbiddenFlag) {
    throw new HTTPException(403, { message: "投票先またはパスワードが違います" });
  }

  const result = await c.env.DB
    .prepare('DELETE FROM ballot_boxes WHERE token = ? AND pass = ?')
    .bind(body.token, pass_hash)
    .run();
  if(!result.success || !result.meta?.changes) {
    throw new HTTPException(500, { message: "削除に失敗しました" });
  } else {
    c.env.DB.prepare('DELETE FROM votes WHERE token = ?').bind(body.token).run();
    return c.text("");
  }
});
