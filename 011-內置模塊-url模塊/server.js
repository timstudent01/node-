const { log } = require("console");

const http = require("http");
const url = require("url");
const moduleRenderStatus = require("./module/renderStatus");
const moduleRenderHTML = require("./module/renderHTML");


// 創建服務器
const server  = http.createServer();

server.on("request",(req, res) => {
    // console.log(url.parse(req.url).pathname);
    const urlobj = url.parse(req.url,true);
    // 如果加上第二個參數 true 就會直接轉成json對象
    console.log(urlobj);
    // console.log(urlobj.query.id,urlobj.query.age);

    const pathname = url.parse(req.url).pathname;
    console.log(pathname);
    res.writeHead(moduleRenderStatus.renderStatus(pathname), { "Content-Type": "text/html;charset=utf-8" })
    res.write(moduleRenderHTML.renderHTML(pathname))
    res.end();
})


server.listen(3000, () => {
    console.log("server start");
})

console.log(url.resolve("one/two/three/","1")); // 如果最後不加斜線 會連不起來