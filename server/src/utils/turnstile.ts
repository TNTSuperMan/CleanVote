import { Context } from "hono";
import { Env } from "../app";

export const Turnstile = (c: Context<{Bindings: Env}>, token: string, ip: string) =>
  fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      secret: c.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip
    })
  }).then<{success: boolean, "error-codes": string[]}>(e=>e.json())
