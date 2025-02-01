import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { getConnInfo } from "hono/cloudflare-workers";
import { d1Client } from "./utils/d1";
import { Turnstile } from "./utils/turnstile";

app.post("/vote", c => {
  if(c.req.raw.cf?.country !== "JP") throw new HTTPException(400, { message: "日本国外IPから投票できません" })
  return c.req.json<{ts: string, token: string, option: number}>()
  .catch(()=>{
    throw new HTTPException(400, { message: "無効なJSON" })
  }).then(async body=>{
    if(
      typeof body !== "object" ||
      typeof body.token !== "string" ||
      typeof body.ts !== "string" ||
      typeof body.option !== "number")
        throw new HTTPException(400, { message: "無効なJSON" })
    else{
      const ip = getConnInfo(c).remote.address ?? "unknown";
      const tsres = await Turnstile(c, body.token, ip);
      if(!tsres.success){
        throw new HTTPException(400, { message: "Turnstileに失敗しました: " + tsres["error-codes"].join(",") })
      }else{
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
      }
    }
  })
})
