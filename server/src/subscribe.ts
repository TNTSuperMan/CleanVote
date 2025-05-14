import { HTTPException } from 'hono/http-exception'
import { app } from './app';
import { sha256 } from 'hono/utils/crypto';
import { d1Client } from './utils/d1';
import { CheckAndIP } from './utils/check';
import * as z from "@zod/mini";
import { parseReq } from './utils/parseReq';

const subscribeReqBody = z.object({
  title: z.string(),
  description: z.string(),
  options: z.array(z.string())
})

const encoder = new TextEncoder;
app.post('/subscribe', c => {
  const ip = CheckAndIP(c);
  return c.req.text().then(async b=>{
    const body = parseReq(b, subscribeReqBody);

    if(
      body.title.length > 256 ||
      body.description.length > 688 ||
      body.options.length > 32 ||
      body.options.some(e=>e.length > 256))
        throw new HTTPException(400, { message: "無効なJSON" })
    
    const pval = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
    const phashp = await sha256(pval);

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
  })}
)
