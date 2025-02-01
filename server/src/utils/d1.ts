import { Context } from "hono";
import { Env } from "../app";
import Cloudflare from "cloudflare";
import { HTTPException } from "hono/http-exception";

export const d1Client = (c: Context<{Bindings: Env}>) => {
  const client = new Cloudflare({
    apiToken: c.env.WRITE_TOKEN,
    apiEmail: c.env.EMAIL
  })
  return async(sql: string, params?: string[]) => {
    const res = await client.d1.database.query(c.env.DB_ID, {
      account_id: c.env.ACCOUNT_ID,
      sql,params})
    if(!res[0].success) throw new HTTPException(500, { message: "データベース操作に失敗しました" })
    return res[0];
  }
}
