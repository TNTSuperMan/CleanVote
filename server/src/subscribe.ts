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
      
      const pval = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
      const phashp = await sha256(pval);

      const ip = getConnInfo(c).remote.address ?? "unknown";
      await Turnstile(c, body.token, ip)
      const d1 = d1Client(c);
      const accesstoken = crypto.randomUUID();
      const phash = await phashp
      if(!phash) throw new HTTPException(500, { message: "パスワードの生成に失敗しました" });
      await d1(
        'INSERT INTO [ballot_boxes] ("token", "createdat", "pass", "title", "description", "options", "ip") VALUES (?,?,?,?,?,?,?)',[
          accesstoken, new Date().toISOString(), phash, body.title, body.description,
          JSON.stringify(body.options), ip
        ])
      
      return c.json({
        pass: pval,
        token: accesstoken
      })
    }
  })}
)
