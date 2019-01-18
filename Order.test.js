const Order = require("./Order");

test("Order is defined", () => {
	expect(Order).toBeDefined();
});

test('Order has "computeOrderTotal" method defined', () => {
	expect(new Order().computeOrderTotal).toBeDefined();
});
