import { Context } from "hono";
import { Env } from "../app";
import { HTTPException } from "hono/http-exception";

export const d1Client = (c: Context<{Bindings: Env}>) => {
  const db = c.env.DB;
  return async(sql: string, params?: string[]) => {
    const res = await db.prepare(sql).bind(...params??[]).all();
    if(!res.success) throw new HTTPException(500, { message: "データベース操作に失敗しました" })
    return res;
  }
}
