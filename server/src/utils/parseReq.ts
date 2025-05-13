import { infer as zodInfer, ZodMiniType } from "@zod/mini";
import { HTTPException } from "hono/http-exception";

export const parseReq = <T extends ZodMiniType>(res: string, schema: T): zodInfer<T> => {
  try{
    const resJson = JSON.parse(res);
    return schema.parse(resJson);
  }catch{
    throw new HTTPException(400, { message: "無効なJSON" })
  }
}
