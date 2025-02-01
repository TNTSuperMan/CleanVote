import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { Turnstile } from "./utils/turnstile";
import { getConnInfo } from "hono/cloudflare-workers";
import { d1Client } from "./utils/d1";

app.post("/data",c=>{
  if(c.req.raw.cf?.country !== "JP") throw new HTTPException(400, { message: "日本国外IPからアクセスできません。" })
  return c.req.json<{ts: string, token: string}>()
  .catch(()=>{throw new HTTPException(400, { message: "無効なJSON" })})
  .then(async body=>{
    if(
      typeof body !== "object" ||
      typeof body.ts !== "string" ||
      typeof body.token !== "string")
        throw new HTTPException(400, { message: "無効なJSON" })
    else{
      const ip = getConnInfo(c).remote.address ?? "unknown";
      const tsres = await Turnstile(c, body.ts, ip);
      if(!tsres.success){
        throw new HTTPException(400, { message: "Turnstileに失敗しました: "+tsres["error-codes"].join(",") })
      }else{
        const d1 = d1Client(c);
        const rawdata = (await d1("SELECT title, description, options FROM ballot_boxes WHERE token = ?", [body.token])).results?.[0] as {
          titile: string, description: string, options: string
        }|void;
        if(!rawdata){
          throw new HTTPException(400, { message: "この投票先は見つかりませんでした。" })
        }else{
          return c.json(rawdata)
        }
      }
    }
  })
})
