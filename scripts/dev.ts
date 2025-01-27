import { createServer } from "vite";
import app from "../server/src/index";
import { serve } from "bun";

if(process.argv.length == 2){
    createServer({
        configFile: "./client/vite.config.ts",
        root: "./client"
    }).then(e=>e.listen(4000)).then(e=>{
        console.log("client started at http://localhost:4000");
    })
    serve({
        fetch: app.fetch,
        port: 3928
    });
}