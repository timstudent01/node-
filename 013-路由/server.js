const http = require("http");
const {URL} = require("url");
const moduleRenderHTML = require("./module/renderHTML");


// 創建服務器
const server  = http.createServer();

server.on("request",(req, res) => {
    const myURL = new URL(req.url,'http://localhost:3000')
    const pathname = myURL.pathname
    console.log(pathname);
    moduleRenderHTML.render(res,pathname,type="")
})


server.listen(3000, () => {
    console.log("server start");
})

