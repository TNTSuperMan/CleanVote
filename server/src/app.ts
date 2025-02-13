import { Hono } from "hono";
import { cors } from "hono/cors";

export type Env = {
    TURNSTILE_SECRET_KEY: string;
    ACCOUNT_ID: string;
    DB_ID: string;
    ACCESS_TOKEN: string;
    WRITE_TOKEN: string;
    EMAIL: string;
    ORIGIN: string; //CORS originの正規表現(テキスト方式の(new RegExp(xxx)))
    BLOCKED_IP?: string; //,で分割されたIPリスト
};
export const app = new Hono<{ Bindings: Env }>()
let reg: RegExp|void;
app.use("*", cors({
  origin: (origin, c) =>
    (reg ?? (reg = new RegExp(c.env.ORIGIN))).test(origin) ? origin : null,
  allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests", "Content-type"],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  allowMethods: ["POST", "OPTIONS"],
  credentials: true,
}))
