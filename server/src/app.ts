import { Hono } from "hono";

type Env = { TURNSTILE_SECRET_KEY: string };
export const app = new Hono<{ Bindings: Env }>()
