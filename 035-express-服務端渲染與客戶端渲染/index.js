const express = require("express");
const app = express();
const port = 44393

// 解析post
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 靜態文件

// 路由
const home = require("./route/HomeRouter")

app.use(express.static("public"))
app.use("/api/home", home.router)

app.listen(port, () => {
    console.log(`server start port : ${port}`);
})
