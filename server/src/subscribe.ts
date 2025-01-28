import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception'
import { app } from './app';

const encoder = new TextEncoder;

app.use("/subscribe", cors({
  origin: ["http://localhost:4000"],
  allowMethods: ["POST", "OPTIONS"]
}))
app.post('/subscribe', c =>
  c.req.json<{token: string, title: string, description: string, options: string[]}>().then(body=>{
    if(
      typeof body !== "object" ||
      typeof body.token !== "string" ||
      typeof body.title !== "string" ||
      typeof body.description !== "string" ||
      !Array.isArray(body.options) ||
      body.options.some(e=>typeof e != "string")){
      throw new HTTPException(400, { message: "無効なJSON形式" });
    }else{
      if(encoder.encode(body.title).length > 256)
        return new Promise<Response>(res=>
          res(c.json({message:"タイトルが長すぎます"},400)));
      if(encoder.encode(body.description).length > 1024)
        return new Promise<Response>(res=>
          res(c.json({message:"説明が長すぎます"},400)));
      return fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
        body: JSON.stringify({
          secret: c.env.TURNSTILE_SECRET_KEY,
          response: body.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST"
      }).then<{success: boolean}>(e=>e.json())
      .then(e=>{
        if(e.success){//TODO:管理トークン等
          return c.json({message:"You are human!"})
        }else{
          return c.json({message:"Turnstileに失敗しました"},400)
        }
      })
    }
  }).catch(()=>{
    throw new HTTPException(400, { message: "無効なJSON" });
  })
)