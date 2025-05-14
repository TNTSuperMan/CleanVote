import { Context } from "hono";
import { Env } from "../app";
import { HTTPException } from "hono/http-exception";
import { getConnInfo } from "hono/cloudflare-workers";

export const Turnstile = (c: Context<{Bindings: Env}>, token: string, ip?: string) =>
  fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      secret: c.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip ?? getConnInfo(c).remote.address
    })
  }).then<{success: boolean, "error-codes": string[]}>(e=>e.json())
  .then(ts=>{
    if(ts.success) return;
    else throw new HTTPException(401, { message: JSON.stringify(ts["error-codes"]) })
  })
