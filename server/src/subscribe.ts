import { HTTPException } from 'hono/http-exception'
import { app } from './app';
import { sha256 } from 'hono/utils/crypto';
import { getConnInfo } from 'hono/cloudflare-workers';
import { Turnstile } from './utils/turnstile';
import { d1Client } from './utils/d1';

const encoder = new TextEncoder;
app.post('/subscribe', c => {
  if(c.req.raw.cf?.country !== "JP") throw new HTTPException(400, { message: "日本国外IPから操作できません" })
  return c.req.json<{token: string, title: string, description: string, options: string[]}>()
  .catch(()=>{
    throw new HTTPException(400, { message: "無効なJSON" });
  }).then(async body=>{
    if(
      typeof body !== "object" ||
      typeof body.token !== "string" ||
      typeof body.title !== "string" ||
      typeof body.description !== "string" ||
      !Array.isArray(body.options) ||
      body.options.some(e=>typeof e !== "string"))
        throw new HTTPException(400, { message: "無効なJSON形式" });
    else{
      if(encoder.encode(body.title).length > 256)
        throw new HTTPException(400, { message: "タイトルが長すぎます" });

      if(encoder.encode(body.description).length > 688)
        throw new HTTPException(400, { message: "説明が長すぎます" });

      if(body.options.length > 32 || body.options.some(e=>encoder.encode(e).length > 256))
        throw new HTTPException(400, { message: "選択肢が長すぎます" });
      
      const ip = getConnInfo(c).remote.address ?? "unknown";
      const tsres = await Turnstile(c, body.token, ip)
      if(!tsres.success){
        throw new HTTPException(400, { message: "Turnstileに失敗しました: " + tsres['error-codes'].join(",") });
      }else{
        const d1 = d1Client(c);
        const accesstoken = crypto.randomUUID();
        const pval = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
        const phash = await sha256(pval);
        if(!phash) throw new HTTPException(500, { message: "パスワードの生成に失敗しました" });
        const qres = d1(
          'INSERT INTO [ballot_boxes] ("token", "pass", "title", "description", "options", "openat", "ip") VALUES (?,?,?,?,?,?,?)',[
            accesstoken, phash, body.title, body.description,
            JSON.stringify(body.options),
            new Date().toISOString(), ip
          ])
        
        return c.json({
          pass: pval,
          token: accesstoken
        })
      }
    }
  })}
)
