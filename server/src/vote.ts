import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { d1Client } from "./utils/d1";
import { CheckAndIP } from "./utils/check";
import * as z from "@zod/mini";
import { parseReq } from "./utils/parseReq";

const voteReqBody = z.object({
  token: z.string(),
  option: z.number()
})

app.post("/vote", c => {
  const ip = CheckAndIP(c);
  return c.req.text().then(async b=>{
    const body = parseReq(b, voteReqBody);

    const d1 = d1Client(c);

    const vfres = await d1("SELECT token FROM ballot_boxes WHERE token = ?",
      [body.token])
    
    if(!vfres.results?.length) throw new HTTPException(400, { message: "存在しない投票先です。" })
    
    const findr = (await d1("SELECT uuid, count FROM votes WHERE ip = ? AND token = ? AND option = ?",
      [ip, body.token, body.option.toString()])).results?.[0] as {uuid: string, count: number}|void;
    console.log(findr)
    if(typeof findr == "object"){
      await d1("UPDATE votes SET count = ? WHERE uuid = ?",[
        (findr.count + 1).toString(),
        findr.uuid])
    }else{
      await d1('INSERT INTO votes ("uuid", "ip", "token", "option", "count") VALUES (?,?,?,?,?)',[
        crypto.randomUUID(), ip, body.token, body.option.toString(), "1"])
    }
    
    return c.text("")
  })
})
