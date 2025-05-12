import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export const parseReq = <T extends z.ZodSchema>(res: string, schema: T): z.infer<T> => {
  try{
    const resJson = JSON.parse(res);
    return schema.parse(resJson);
  }catch{
    throw new HTTPException(400, { message: "無効なJSON" })
  }
}
