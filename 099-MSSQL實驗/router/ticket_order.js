const express = require("express");
const router = express.Router();
const sqlcommand = require("../sqlcommand/sqlcommand");
let T_SQL = "";

// 會員訂單
router.get("/:customer_id", (req, res) => {
    const customer_id = req.params.customer_id;
    T_SQL = `select * from ticket_order where customer_id = ${customer_id}`
    sqlcommand.queryTicketOrder(T_SQL, res)
})

// 會員詳細訂單
router.get("/detail/:order_id", (req, res) => {
    const order_id = req.params.order_id;
    T_SQL = `
    SELECT order_id, area, event_id, seat_id FROM ticket_order_detail WHERE order_id = ${order_id}`
    sqlcommand.queryTicketOrderDetailOrderId(T_SQL, res)
})

// 取消票券訂單
router.post("/CancelTicketOrder/:order_id", async(req, res) => {
    const order_id = req.body.order_id;

    if (order_id != null) {
        // 得到訂單
        T_SQL = `select * FROM Ticket_order WHERE order_id = ${order_id};`;
        const ticketOrder = await sqlcommand.NormalAsyncQuery(T_SQL, res)
        // 得到詳細訂單陣列
        T_SQL = `select * FROM Ticket_order_detail WHERE order_id = ${order_id};`;
        const ticket_order_details = [ await sqlcommand.NormalAsyncQuery(T_SQL, res)]
        console.log(ticket_order_details);
        // 遍歷刪除詳細訂單
        ticket_order_details.forEach(async ticket_order_detail => {
            // 加回庫存
            T_SQL = `UPDATE s SET Stock = s.Stock + 1, Sold = s.Sold - 1 FROM Seat_Stock s INNER JOIN Ticket_Order_Detail d ON s.Area = d.Area AND s.Event_Id = d.Event_Id WHERE d.Order_Id = ${ticket_order_detail.order_id};`;
            await sqlcommand.NormalAsyncQuery(T_SQL, res)
            // 刪除詳細訂單
            T_SQL = `DELETE FROM Ticket_order_detail WHERE order_id = ${ticket_order_detail.order_id};`;
            await sqlcommand.NormalAsyncQuery(T_SQL, res)
        });
        // 刪除訂單
        T_SQL = `DELETE FROM Ticket_order WHERE order_id = ${ticketOrder.order_id};`;
        await sqlcommand.NormalAsyncQuery(T_SQL, res)
    }
    res.send("已取消")
})

// 取消票券詳細訂單
router.post("/CancelTicketOrderDetail/:order_id", async(req, res) => {
    const order_id = req.body.order_id;
    console.log(order_id);
    if (order_id != null) {

        // 修改訂單狀態
        T_SQL = `UPDATE Ticket_Order SET Order_State = 2 WHERE Order_Id = ${order_id};`;
        await sqlcommand.NormalAsyncQuery(T_SQL, res)

        // 得到詳細訂單陣列
        T_SQL = `select * FROM Ticket_order_detail WHERE order_id = ${order_id};`;
        const ticket_order_details = await sqlcommand.NormalAsyncQuery(T_SQL, res)
        // 遍歷刪除詳細訂單
        ticket_order_details.forEach(async ticket_order_detail => {
            // 加回庫存
            T_SQL = `UPDATE s SET Stock = s.Stock + 1, Sold = s.Sold - 1 FROM Seat_Stock s INNER JOIN Ticket_Order_Detail d ON s.Area = d.Area AND s.Event_Id = d.Event_Id WHERE d.Order_Id = ${ticket_order_detail.order_id};`;
            await sqlcommand.NormalAsyncQuery(T_SQL, res)
            // 刪除詳細訂單
            T_SQL = `DELETE FROM Ticket_order_detail WHERE order_id = ${ticket_order_detail.order_id};`;
            await sqlcommand.NormalAsyncQuery(T_SQL, res)
        });
    }
    res.send("已取消")

})

// 訂票
// 會員詳細訂單
router.post("/", async (req, res) => {
    // 先得到傳進來的資料
    console.log(req.body.order_info);
    const orderInfo = [];
    for (let i = 0; i < req.body.order_info.length; i++) {
        orderInfo.push({
            area: req.body.order_info[i].area,
            price: req.body.order_info[i].price,
            quantity: req.body.order_info[i].quantity,
            count: req.body.order_info[i].count,
        });
    }
    const CTicketOrder_PostOrderInfo_ViewModel = {
        order_info: orderInfo,
        order_price: req.body.order_price,
        event_id: req.body.event_id,
        customer_id: req.body.customer_id,
    };
    // 先得到傳進來的資料
    const TicketOrder = {
        OrderId: null,
        CustomerId: null,
        OrderUpdateId: 0,
        OrderCreateTimestamp: null,
        OrderUpdateTimestamp: null,
        OrderTotalPrice: null,
        OrderState: 0,
    }
    const order = TicketOrder;
    order.OrderId = await sqlcommand.generateOrderId();
    order.CustomerId = CTicketOrder_PostOrderInfo_ViewModel.customer_id;
    order.OrderUpdateId = 0;
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    order.OrderCreateTimestamp = formattedDate;
    order.OrderUpdateTimestamp = formattedDate;
    order.OrderTotalPrice = parseFloat(CTicketOrder_PostOrderInfo_ViewModel.order_price);
    order.OrderState = 0;

    T_SQL = `
    INSERT INTO ticket_order
    (order_id, customer_id, order_update_id, order_create_timestamp, order_update_timestamp, order_total_price, order_state)
    VALUES
    (${order.OrderId}, ${order.CustomerId}, 0, '${order.OrderCreateTimestamp}', '${order.OrderUpdateTimestamp}', ${order.OrderTotalPrice}, 0)
    `
    await sqlcommand.createTicketOrder(T_SQL, res)

    for (const orderItem of orderInfo) {
        T_SQL = `
            SELECT TOP(1) [s].[area], [s].[event_id], [s].[stock]
            FROM [seat_stock] AS [s]
            WHERE ([s].[area] = '${orderItem.area}' AND ([s].[event_id] = ${CTicketOrder_PostOrderInfo_ViewModel.event_id}));
            `
        const seatStock = await sqlcommand.checkSeatStock(T_SQL, res)
        if (seatStock.stock < orderItem.count) {
            return "所選取的票券不足";
        }
    }
    for (const OrderItem of orderInfo) {
        for (let i = 0; i < OrderItem.count; i++) {
            // 創建新詳細訂單
            const TicketOrderDetail = {
                OrderId: null,
                EventId: null,
                Area: null,
                SeatId: null,
                CustomerId: null
            }
            const tod = TicketOrderDetail;
            tod.Area = OrderItem.area;
            // 傳過來的活動Id
            tod.EventId = CTicketOrder_PostOrderInfo_ViewModel.event_id;
            // 查找該區的座位最大值
            T_SQL = `SELECT MAX(seat_id) as number FROM ticket_order_detail WHERE Area = '${OrderItem.area}' AND event_id = ${CTicketOrder_PostOrderInfo_ViewModel.event_id};`
            let SeatIdMax = await sqlcommand.checkSeatStockMAX(T_SQL, res)
            console.log(OrderItem.area + SeatIdMax[0].number);
            if (SeatIdMax[0].number == null) {
                SeatIdMax = 1;
            } else {
                SeatIdMax = await sqlcommand.checkSeatStockMAX(T_SQL, res);
                SeatIdMax = SeatIdMax[0].number + 1

            }
            T_SQL = `UPDATE seat_stock SET Stock = Stock - 1, Sold = Sold + 1 WHERE Area = '${OrderItem.area}' AND event_id = ${CTicketOrder_PostOrderInfo_ViewModel.event_id}; `
            await sqlcommand.updateSeatStock(T_SQL, res)

            tod.SeatId = SeatIdMax;
            // 傳過來的會員Id
            tod.CustomerId = CTicketOrder_PostOrderInfo_ViewModel.customer_id;
            // 查找訂單Id最大值
            tod.OrderId = order.OrderId;
            T_SQL = `INSERT INTO ticket_order_detail (Order_Id, Event_Id, Area, Seat_Id, Customer_Id)
            VALUES (${tod.OrderId}, ${tod.EventId}, '${tod.Area}', ${tod.SeatId}, ${tod.CustomerId});`
            await sqlcommand.createTicketOrderDetail(T_SQL, res)
        }
    }
    await res.send(`${order.OrderId}`)
})




module.exports = router;
