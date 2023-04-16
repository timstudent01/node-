const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send(["123","456","4789"])
})

module.exports = {
    router
}