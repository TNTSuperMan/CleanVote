import { Hono } from 'hono'
import { env } from 'hono/adapter';
import { HTTPException } from 'hono/http-exception'
type Env = { TURNSTILE_SECRET_KEY: string };
const app = new Hono<{ Bindings: Env }>()

app.post('subscribe', c =>
  c.req.json<{token: string, title: string, description: string}>().then(body=>{
    if(typeof body !== "object" || typeof body.token !== "string" || typeof body.title !== "string" || typeof body.description !== "string"){
      throw new HTTPException(400, { message: "Invalid JSON props" });
    }else{
      const x = <T>(a:T):T => (console.log(a),a)
      console.time("fetch")
      return fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
        body: x(JSON.stringify({
          secret: env<Env>(c).TURNSTILE_SECRET_KEY,
          response: body.token,
        })),
        method: "POST"
      }).then<{success: boolean}>(e=>e.json())
      .then(e=>{
        console.timeEnd("fetch")
        if(e.success){
          return c.text("You are human!")
        }else{
          return c.text("YOU ARE ROBOT",403)
        }
      })
    }
  }).catch(()=>{
    throw new HTTPException(400, { message: "Invalid JSON" });
  })
)

export default app