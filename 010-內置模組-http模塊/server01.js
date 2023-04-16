const { log } = require("console");
const http = require("http");

// 創建服務器
http.createServer((req,res)=>{
    // 接受瀏覽器傳的參數，返回渲染的內容
    // req 接收瀏覽器傳的參數
    // res 返回渲染的內容

    // 要寫好響應頭
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})
    // res.write("hello world")
    res.write(`
    <html>
    <h1>HI I AM h1</h1>
    <h2>因為寫了charset=utf-8 所以可以顯示中文了</h2>
    <div style="background-color:skyblue;">123</div>
    </html>
    `)
    res.end();
}).listen(3000,()=>{
    console.log("server start");
})








