import { Hono } from "hono";

type Env = {
    TURNSTILE_SECRET_KEY: string;
    ACCOUNT_ID: string;
    DB_ID: string;
    TOKEN: string;
    EMAIL: string;
};
export const app = new Hono<{ Bindings: Env }>()
