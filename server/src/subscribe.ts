import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception'
import { app } from './app';
import Cloudflare from 'cloudflare';

const encoder = new TextEncoder;

app.use("/subscribe", cors({
  origin: ["http://localhost:4000"],
  allowMethods: ["POST", "OPTIONS"]
}))
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
      
      const tsres = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
        body: JSON.stringify({
          secret: c.env.TURNSTILE_SECRET_KEY,
          response: body.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST"}).then<{success: boolean}>(e=>e.json())
      if(!tsres.success){
        throw new HTTPException(400, { message: "Turnstileに失敗しました" });
      }else{
        const client = new Cloudflare({
          apiKey: c.env.TOKEN,
          apiEmail: c.env.EMAIL
        })
        client.d1.database.query(c.env.DB_ID, {
          account_id: c.env.ACCOUNT_ID,
          sql: "SELECT",
          params: [
            
          ]
        })
        return c.json({message:"You are human!"})
      }
    }
  })
)