const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("hello world")
    res.end();
})

app.get("/login",(req,res)=>{
    res.send(`
    <html>
        <div style="background-color:pink; display:flex; justify-content:center">
            <h1>123</h1>
        </div>
    </html>
    `)
    res.end();
})

app.listen(3000,()=>{
    console.log("server start");
})