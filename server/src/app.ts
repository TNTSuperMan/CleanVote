import { Hono } from "hono";
import { cors } from "hono/cors";
import { Turnstile } from "./utils/turnstile";

const tsheadid = "Turnstile-Token"

export type Env = {
  TURNSTILE_SECRET_KEY: string;
  DB: D1Database;
  ORIGIN: string; //生origin
  BLOCKED_IP?: string; //,で分割されたIPリスト
};
export const app = new Hono<{ Bindings: Env }>()
app.use("*", cors({
  origin: (_, c) => c.env.ORIGIN,
  allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests", "Content-type", tsheadid],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  allowMethods: ["POST", "OPTIONS"],
  credentials: true,
}))
app.use("*", async(c, n) => {
  await Turnstile(c, c.req.header(tsheadid) ?? "");
  return await n();
})
