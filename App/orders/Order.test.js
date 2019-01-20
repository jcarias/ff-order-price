const Order = require("./Order");

test("Order is defined", () => {
  expect(Order).toBeDefined();
});

test('Order has "getOrderTotal" method defined', () => {
  expect(new Order().getOrderTotal).toBeDefined();
});

test("No arguments order throws an error", () => {
  expect(() => new Order().getOrderTotal()).toThrow();
});

test("Empty order value is 0", () => {
  const order = new Order([]);
  expect(order.getOrderTotal()).toBe(0);
});

test("Bad orders array type throws an error", () => {
  const order = new Order([1, 2, 3]);
  expect(() => order.getOrderTotal()).toThrow();
});

const OrderItem = require("./OrderItem");

test("Order of 1 unit of 1 item equals it's price", () => {
  let orders = [new OrderItem("", 0.5, 1)];
  const order = new Order(orders);
  expect(order.getOrderTotal()).toEqual(0.5);
});

test("Order of 2 unit of 1 item doubles the unit price", () => {
  let orders = [new OrderItem("", 0.5, 2)];
  const order = new Order(orders);
  expect(order.getOrderTotal()).toEqual(1);
});

test("Order 5 items with different prices and quantities is OK ", () => {
  let orders = [
    new OrderItem("P1", 0.5, 2),
    new OrderItem("P2", 0.75, 2),
    new OrderItem("P3", 2, 4),
    new OrderItem("P4", 28.87, 5),
    new OrderItem("P5", 11.25, 2)
  ];
  const order = new Order(orders);
  expect(order.getOrderTotal()).toEqual(177.35);
});
