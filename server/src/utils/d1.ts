import { Context } from "hono";
import { Env } from "../app";
import Cloudflare from "cloudflare";

export const d1Client = (c: Context<{Bindings: Env}>) => {
  const client = new Cloudflare({
    apiToken: c.env.WRITE_TOKEN,
    apiEmail: c.env.EMAIL
  })
  return (sql: string, params?: string[]) =>
    client.d1.database.query(c.env.DB_ID, {
      account_id: c.env.ACCOUNT_ID,
      sql,params})
}
