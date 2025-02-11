import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { d1Client } from "./utils/d1";
import { CheckAndIP } from "./utils/check";

app.post("/data",c=>{
  CheckAndIP(c);
  return c.req.text().then(async token=>{
    const d1 = d1Client(c);
    const rawdata = (await d1("SELECT title, description, options FROM ballot_boxes WHERE token = ?",
        [token])).results?.[0] as {
      titile: string, description: string, options: string
    }|void;
    if(!rawdata){
      throw new HTTPException(400, { message: "この投票先は見つかりませんでした。" })
    }else{
      return c.json(rawdata)
    }
  })
})
