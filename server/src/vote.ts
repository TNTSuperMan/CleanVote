import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { d1Client } from "./utils/d1";
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
  const d1 = d1Client(c);

  const { results: { length: boxes_count } } = await d1("SELECT token FROM ballot_boxes WHERE token = ?", [
    body.token,
  ]);
  
  if(!boxes_count) {
    throw new HTTPException(400, { message: "存在しない投票先です。" });
  }
  
  const vote = (
    await d1("SELECT uuid, count FROM votes WHERE ip = ? AND token = ? AND option = ?", [
      ip, body.token, body.option.toString(),
    ])
  ).results?.[0] as {
    uuid: string,
    count: number
  } | undefined;

  if (vote) {
    await d1("UPDATE votes SET count = ? WHERE uuid = ?", [
      (vote.count + 1).toString(),
      vote.uuid,
    ]);
  }else{
    await d1('INSERT INTO votes ("uuid", "ip", "token", "option", "count") VALUES (?,?,?,?,?)',[
      crypto.randomUUID(), ip, body.token, body.option.toString(), "1",
    ]);
  }
  
  return c.text("");
});
