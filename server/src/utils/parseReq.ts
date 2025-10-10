import { infer as zodInfer, ZodMiniType } from "@zod/mini";
import { HonoRequest } from "hono";
import { HTTPException } from "hono/http-exception";

export const parseReq = async <T extends ZodMiniType>(req: HonoRequest, schema: T): Promise<zodInfer<T>> => {
  try{
    return schema.parse(await req.json());
  }catch{
    throw new HTTPException(400, { message: "無効なJSON" })
  }
}
