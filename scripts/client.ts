import { createServer } from "vite";

createServer({
    configFile: "./client/vite.config.ts",
    root: "./client",
    server: {
        port: 4000
    }
}).then(e=>e.listen(4000)).then(e=>{
    console.log("client started at http://localhost:4000");
})
