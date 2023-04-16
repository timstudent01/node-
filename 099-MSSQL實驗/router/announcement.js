const express = require("express");
const router = express.Router();
const sqlcommand = require("../sqlcommand/sqlcommand");
let T_SQL = "";

router.get("/", (req, res) => {
    T_SQL = `
    select * from announcement
    `
    sqlcommand.NormalQuery(T_SQL,res)
})



module.exports = router;
