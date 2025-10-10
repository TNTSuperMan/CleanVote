import { Context } from "hono";
import { Env } from "../app";
import { HTTPException } from "hono/http-exception";
import { getConnInfo } from "hono/cloudflare-workers";

export const Turnstile = async (c: Context<{Bindings: Env}>, token: string, ip?: string) => {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      secret: c.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip ?? getConnInfo(c).remote.address
    })
  });
  const result: {
    success: boolean,
    "error-codes": string[]
  } = await response.json();
  
  if (!result.success) {
    throw new HTTPException(401, { message: JSON.stringify(result["error-codes"]) })
  }
}
