const moduleRenderStatus = require("./renderStatus");
const {router} = require("./router")

const render = (res,pathname,type)=>{
    res.writeHead(moduleRenderStatus.renderStatus(pathname), { "Content-Type": `${type?type:"text/html"};charset=utf-8` })
    try {
        res.write(router[pathname]())
    
    } catch {
        res.write(router["/404"]())
    
    }
    res.end();
}




module.exports = {
    render
}