import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { Env } from "../app";
import { getConnInfo } from "hono/cloudflare-workers";

export const CheckAndIP = (c: Context<{Bindings: Env}>) => {
  const ip = getConnInfo(c).remote.address ?? "unknown";
  if(c.req.raw.cf?.country !== "JP") {
    throw new HTTPException(400, { message: "日本国外IPからアクセスできません。" });
  }
  if(c.env.BLOCKED_IP && c.env.BLOCKED_IP?.split(",").includes(ip)) {
    throw new HTTPException(400, { message: "IPBANされています。" });
  }
  return ip;
}
