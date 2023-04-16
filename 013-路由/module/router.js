const fs = require("fs");

const router = {
    "/home": ()=>{
        return fs.readFileSync("./static/home.html")
    },
    "/login": ()=>{
        return fs.readFileSync("./static/login.html")
    },
    "/404":()=>{
        return fs.readFileSync("./static/404.html")
    }
}

module.exports = {
    router
}