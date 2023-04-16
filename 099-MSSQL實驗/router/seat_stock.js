const express = require("express");
const router = express.Router();
const sqlcommand = require("../sqlcommand/sqlcommand");
let T_SQL = "";

router.get("/Id/:event_id", (req, res) => {
    const event_id = req.params.event_id;
    T_SQL = `
    select * from seat_stock where event_id = ${event_id}
    `
    sqlcommand.querySeatStock(T_SQL,res)
})
router.get("/EventId/:event_id", (req, res) => {
    const event_id = req.params.event_id;
    T_SQL = `
    select * from seat_stock where event_id = ${event_id}
    `
    sqlcommand.querySeatStock(T_SQL,res)
})
module.exports = router;
