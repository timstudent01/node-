const express = require("express");
const router = express.Router();
const sqlcommand = require("../sqlcommand/sqlcommand");
let T_SQL = "";

router.get("/Carousel", (req, res) => {
    const event_id = req.params.event_id;
    T_SQL = `
    select * from advertisement where advertisement_online = 1
    `
    sqlcommand.NormalQuery(T_SQL,res)
})

module.exports = router;
