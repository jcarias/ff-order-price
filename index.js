const OItem = require("./OrderItem");
const Order = require("./Order");

let oi1 = new OItem("P1", 2.5, 3);
let oi2 = new OItem("P2", 4.5, 2);
let orders = [oi1, oi2];

let order = new Order(orders, 0);

console.log(order.computeOrderTotal());
