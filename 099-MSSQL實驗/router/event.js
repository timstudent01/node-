const express = require("express");
const router = express.Router();
const sqlcommand = require("../sqlcommand/sqlcommand");
let T_SQL = "";

router.get("/Id/:event_id", (req, res) => {
    const event_id = req.params.event_id;
    T_SQL = `
    SELECT [e].*, [c].*, [et].*, [el].*
    FROM [Event] AS [e]
    INNER JOIN company AS [c] ON [e].[company_id] = [c].company_id
    INNER JOIN event_type AS [et] ON [e].event_type_id = [et].event_type_id
    INNER JOIN event_location AS [el] ON [e].event_location_id = [el].event_location_id
    WHERE [e].event_id = ${event_id} AND [e].event_isstate = 1`
    sqlcommand.queryTicketOrderDetailEventId(T_SQL,res)
})

router.get("/", (req, res) => {
    T_SQL = `
    select * from event`
    sqlcommand.queryEvent(T_SQL,res)
})


module.exports = router;
