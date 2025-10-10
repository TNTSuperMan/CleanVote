import { HTTPException } from "hono/http-exception";
import { app } from "./app";
import { CheckAndIP } from "./utils/check";

app.post("/data", async c => {
  CheckAndIP(c);
  const token = await c.req.text();
  
  const rawdata = await c.env.DB
    .prepare('SELECT title, description, options FROM ballot_boxes WHERE token = ?')
    .first<{
      titile: string;
      description: string;
      options: string;
    }>(token);

  if(!rawdata){
    throw new HTTPException(404, { message: "この投票先は見つかりませんでした。" });
  }else{
    return c.json(rawdata);
  }
});
