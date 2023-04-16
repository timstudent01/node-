const express = require("express");
const router = express.Router();
const sqlcommand = require("../sqlcommand/sqlcommand");
let T_SQL = "";

router.get("/", (req, res) => {
    T_SQL = `
    SELECT d.details_id, d.eventtime, d.event_id, d.state, d.reason,
       e.event_image, e.event_name, e.event_info, e.company_id,
       e.event_sell_start_timestamp, e.event_sell_end_timestamp,
       e.event_start_timestamp, e.event_end_timestamp, e.event_type_id,
       e.event_location_id, e.event_isstate
    FROM details d
    INNER JOIN event e ON d.event_id = e.event_id
    `
    sqlcommand.NormalQuery(T_SQL, res)
})

router.get("/:details_id", (req, res) => {
    const details_id = req.params.details_id;
    T_SQL = `
    SELECT d.details_id, d.eventtime, e.event_name, e.event_image, 
       d.state, d.reason, e.event_info, e.event_end_timestamp,
       e.event_sell_start_timestamp
    FROM details d
    INNER JOIN event e ON d.event_id = e.event_id
    WHERE d.event_id = ${details_id}
    `
    sqlcommand.NormalQuery(T_SQL, res)
})


module.exports = router;
