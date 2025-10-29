import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { CheckAndIP } from "./utils/check";
import * as z from "@zod/mini";
import { parseReq } from "./utils/parseReq";

const voteReqBody = z.object({
  token: z.string(),
  option: z.number(),
});

app.post("/vote", async c => {
  const ip = CheckAndIP(c);
  const body = await parseReq(c.req, voteReqBody)

  const box = await c.env.DB
    .prepare('SELECT token FROM ballot_boxes WHERE token = ?')
    .bind(body.token)
    .first();
  
  if (!box) {
    throw new HTTPException(400, { message: "存在しない投票先です。" });
  }
  
  const vote = await c.env.DB
    .prepare('SELECT uuid, count FROM votes WHERE ip = ? AND token = ? AND option = ?')
    .bind(ip, body.token, body.option.toString())
    .first<{
      uuid: string;
      count: number;
    }>();

  if (vote) {
    await c.env.DB
      .prepare('UPDATE votes SET count = ? WHERE uuid = ?')
      .bind((vote.count + 1).toString(), vote.uuid)
      .run();
  } else {
    await c.env.DB
      .prepare('INSERT INTO votes ("uuid", "ip", "token", "option", "count") VALUES (?,?,?,?,?)')
      .bind(crypto.randomUUID(), ip, body.token, body.option.toString(), "1")
      .run();
  }
  
  return c.text("");
});
