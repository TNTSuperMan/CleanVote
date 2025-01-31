import { Hono } from "hono";
import { cors } from "hono/cors";

type Env = {
    TURNSTILE_SECRET_KEY: string;
    ACCOUNT_ID: string;
    DB_ID: string;
    ACCESS_TOKEN: string;
    WRITE_TOKEN: string;
    EMAIL: string;
};
export const app = new Hono<{ Bindings: Env }>()

app.use("*", cors({
  origin: ["http://localhost:4000", "https://*.cleanvote.pages.dev/", "https://cleanvote.pages.dev/"],
  allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests", "Content-type"],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  allowMethods: ["POST", "OPTIONS"],
  credentials: true,
}))
