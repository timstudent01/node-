const express = require("express");
const router = express.Router();
const sqlcommand = require("../sqlcommand/sqlcommand");
const sql = require("msnodesqlv8");
const str = "server=.;Database=Young-Artists;Trusted_Connection=Yes;Driver={SQL Server}"
let T_SQL = "";

// JWT
const { verifyToken } = require("../jwt/jwt")
// 請求
router.get("/", (req, res) => {
    sql.query(str, "select * from customers", (err, rows) => {
        res.send(rows)
        console.log("query success /api/customers");
    })
})

// 登入api
router.post("/", (req, res) => {
  T_SQL = `select * from customers where customer_email = '${req.body.customerEmail}' AND customer_password = '${req.body.customerPassword}'`;
  sqlcommand.queryCustomer(T_SQL, req, res);
});

// 驗證token
router.get("/verify", (req, res) => {
  if (verifyToken(req, res) == "token過期") {
    res.send(null)
  }
});

module.exports = router;
