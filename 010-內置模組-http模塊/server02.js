const { log } = require("console");
const http = require("http");
const moduleRenderStatus = require("./module/renderStatus");
const moduleRenderHTML = require("./module/renderHTML");


// 創建服務器
http.createServer((req, res) => {
    // 響應頭 改成方法
    res.writeHead(moduleRenderStatus.renderStatus(req.url), { "Content-Type": "text/html;charset=utf-8" })
    // 響應體 根據req.url 變換
    res.write(moduleRenderHTML.renderHTML(req.url))
    res.end();
}).listen(3001, () => {
    console.log("server start");
})

// 創建服務器
http.createServer((req, res) => {
    // 響應頭 改成方法
    res.writeHead(moduleRenderStatus.renderStatus(req.url), { "Content-Type": "text/html;charset=utf-8" })
    // 響應體 根據req.url 變換
    res.write(moduleRenderHTML.renderHTML(req.url))
    res.end();
}).listen(3005, () => {
    console.log("server start");
})
// 創建服務器
const server  = http.createServer();

server.on("request",(req, res) => {
    res.writeHead(moduleRenderStatus.renderStatus(req.url), { "Content-Type": "text/html;charset=utf-8" })
    res.write(moduleRenderHTML.renderHTML(req.url))
    res.end();
})

server.listen(3000, () => {
    console.log("server start");
})

