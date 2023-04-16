const { log } = require("console");

const http = require("http");
// const url = require("url");
const {URL} = require("url");
const moduleRenderStatus = require("./module/renderStatus");
const moduleRenderHTML = require("./module/renderHTML");
const { format } = require("path");


// 創建服務器
const server  = http.createServer();

server.on("request",(req, res) => {
    const myURL = new URL(req.url,'http://localhost:3000')
    // console.log(myURL);
    // console.log(myURL.searchParams.get("id"));
    // for (let [key,value] of myURL.searchParams){
    //     console.log(key,value);
    // }

    // 可以幫URL加上公式
    // console.log(url.format(myURL,{unicode:true,auth:false,fragment:false,search:false}));
    // URL新模板就有unicode:true

    console.log(myURL.toString());
    const pathname = myURL.pathname
    console.log(pathname);
    res.writeHead(moduleRenderStatus.renderStatus(pathname), { "Content-Type": "text/html;charset=utf-8" })
    res.write(moduleRenderHTML.renderHTML(pathname),"utf-8")
    res.end();
})


server.listen(3000, () => {
    console.log("server start");
})

