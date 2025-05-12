import { HTTPException } from 'hono/http-exception'
import { app } from './app';
import { sha256 } from 'hono/utils/crypto';
import { d1Client } from './utils/d1';
import { CheckAndIP } from './utils/check';
import { z } from 'zod';
import { parseReq } from './utils/parseReq';

const subscribeReqBody = z.object({
  title: z.string().length(256),
  description: z.string().length(688),
  options: z.array(z.string().length(256)).length(32)
})

const encoder = new TextEncoder;
app.post('/subscribe', c => {
  const ip = CheckAndIP(c);
  return c.req.text().then(async b=>{
    const body = parseReq(b, subscribeReqBody);
    
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
