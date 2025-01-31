import { HTTPException } from 'hono/http-exception'
import { app } from './app';
import Cloudflare from 'cloudflare';
import { sha256 } from 'hono/utils/crypto';
import { getConnInfo } from 'hono/cloudflare-workers';
import { getCookie } from 'hono/cookie';

const encoder = new TextEncoder;
app.post('/subscribe', c =>
  c.req.json<{token: string, title: string, description: string, options: string[]}>()
  .catch(()=>{
    throw new HTTPException(400, { message: "無効なJSON" });
  }).then(async body=>{
    if(
      typeof body !== "object" ||
      typeof body.token !== "string" ||
      typeof body.title !== "string" ||
      typeof body.description !== "string" ||
      !Array.isArray(body.options) ||
      body.options.some(e=>typeof e != "string"))
        throw new HTTPException(400, { message: "無効なJSON形式" });
    else{
      if(encoder.encode(body.title).length > 256)
        throw new HTTPException(400, { message: "タイトルが長すぎます" });

      if(encoder.encode(body.description).length > 688)
        throw new HTTPException(400, { message: "説明が長すぎます" });

      if(body.options.length > 32 || body.options.some(e=>encoder.encode(e).length > 256))
        throw new HTTPException(400, { message: "選択肢が長すぎます" });
      
      const cinfo = getConnInfo(c);
      console.log(cinfo.remote.address)
      const tsres = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
        body: JSON.stringify({
          secret: c.env.TURNSTILE_SECRET_KEY,
          response: body.token,
          remoteip: cinfo.remote.address,
          idempotency_key: getCookie(c, "id")
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST"}).then<{success: boolean}>(e=>e.json())
      if(!tsres.success){
        throw new HTTPException(400, { message: "Turnstileに失敗しました" });
      }else{
        const client = new Cloudflare({
          apiToken: c.env.WRITE_TOKEN,
          apiEmail: c.env.EMAIL
        })
        const accesstoken = crypto.randomUUID();
        const pval = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
        const phash = await sha256(pval);
        if(!phash) throw new HTTPException(500, { message: "パスワードの生成に失敗しました" });
        const qres = await client.d1.database.query(c.env.DB_ID, {
          account_id: c.env.ACCOUNT_ID,
          sql: 'INSERT INTO [ballot_boxes] ("token", "pass", "title", "description", "options") VALUES (?,?,?,?,?)',
          params: [
            accesstoken, phash, body.title, body.description,
            JSON.stringify(body.options)
          ]
        })
        
        return c.json({
          pass: pval,
          token: accesstoken
        })
      }
    }
  })
)