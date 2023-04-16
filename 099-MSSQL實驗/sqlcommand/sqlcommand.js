const sql = require("msnodesqlv8");
const str = "server=.;Database=Young-Artists;Trusted_Connection=Yes;Driver={SQL Server}"
const { getToken } = require("../jwt/jwt")

// 通用查詢
function NormalQuery(T_SQL, res) {
    sql.query(str, T_SQL, (err, rows) => {
        if (rows != null) {
            res.send(rows)
        } else {
            console.log("query error");
        }
    })
}
// 通用異步查詢
async function NormalAsyncQuery(T_SQL, res) {
    return new Promise((resolve, reject) => {
        sql.query(str, T_SQL, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })

}

// 登入會員
function queryCustomer(T_SQL, req, res) {
    sql.query(str, T_SQL, (err, rows) => {
        if (rows != null && rows[0].customer_password == req.body.customerPassword) {
            // 如果有找到則拿去JWT加密
            res.send(JSON.stringify(getToken(rows[0])))
        } else {
            console.log("queryCustomer error");
        }
    })
}

// 查看會員訂單
function queryTicketOrder(T_SQL, res) {
    sql.query(str, T_SQL, (err, rows) => {
        if (rows != null) {
            res.send(rows)
        } else {
            console.log("queryTicketOrder error");
        }
    })
}
// 查看會員詳細訂單
function queryTicketOrderDetailEventId(T_SQL, res) {
    sql.query(str, T_SQL, (err, rows) => {
        if (rows != null) {
            res.send(rows)
        } else {
            console.log("queryTicketOrderDetailEventId error");
        }
    })
}
function queryTicketOrderDetailOrderId(T_SQL, res) {
    sql.query(str, T_SQL, (err, rows) => {
        if (rows != null) {
            res.send(rows)
        } else {
            console.log("queryTicketOrderDetailOrderId error");
        }
    })
}
// 查看活動座位
function querySeatStock(T_SQL, res) {
    sql.query(str, T_SQL, (err, rows) => {
        if (rows != null) {
            res.send(rows)
        } else {
            console.log("querySeatStock error");
        }
    })
}
function queryEvent(T_SQL, res) {
    sql.query(str, T_SQL, (err, rows) => {
        if (rows != null) {
            res.send(rows)
        } else {
            console.log("queryEvent error");
        }
    })
}

async function createTicketOrder(T_SQL, res) {
    return new Promise((resolve, reject) => {
        sql.query(str, T_SQL, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

async function checkSeatStock(T_SQL, res) {
    return new Promise((resolve, reject) => {
        sql.query(str, T_SQL, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

async function checkSeatStockMAX(T_SQL, res) {
    return new Promise((resolve, reject) => {
        sql.query(str, T_SQL, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })

}


async function updateSeatStock(T_SQL, res) {
    return new Promise((resolve, reject) => {
        sql.query(str, T_SQL, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })

}

async function createTicketOrderDetail(T_SQL, res) {
    return new Promise((resolve, reject) => {
        sql.query(str, T_SQL, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })

}

// 獲取訂單唯一ID
function generateOrderId() {
    let order_id;
    do {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const dateNumber = `${year}${month}`;
        order_id = `${dateNumber}${Math.floor(Math.random() * 9000 + 1000)}`;
        const result = sql.query(str, `SELECT COUNT(*) AS count FROM Ticket_Order WHERE Order_Id = ${order_id}`);
        if (result[0] === 1) {
            order_id = null;
        }
    } while (!order_id);
    return parseInt(order_id);
}
// 輸出
module.exports = {
    queryTicketOrder,
    queryCustomer,
    queryTicketOrderDetailEventId,
    queryTicketOrderDetailOrderId,
    querySeatStock,
    createTicketOrder,
    checkSeatStock,
    checkSeatStockMAX,
    updateSeatStock,
    createTicketOrderDetail,
    queryEvent,
    generateOrderId,
    NormalQuery,
    NormalAsyncQuery,

}