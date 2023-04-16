// 伺服器架構
const express = require("express");
const app = express();
const port = 44393;

// 解析 POST 請求主體
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 跨域
const cors = require("cors");
app.use(cors());


// 路由
const ticket_order = require("./router/ticket_order");
const customer = require("./router/customer")
const event = require("./router/event")
const seat_stock = require("./router/seat_stock")
const carousel = require("./router/carousel")
const announcement =require("./router/announcement")
const announcement_detail = require("./router/announcement_detail");

app.use("/api/TicketOrders",ticket_order)
app.use("/api/Customers",customer)
app.use("/api/Events",event)
app.use("/api/SeatStocks",seat_stock)
app.use("/api/Advertisements",carousel)
app.use("/api/Announcements",announcement)
app.use("/api/Details",announcement_detail)

app.use(express.static('Images'));


app.listen(port, () => {
    console.log(`server start ${port}`);
})