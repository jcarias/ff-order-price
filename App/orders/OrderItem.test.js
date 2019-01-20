const OrderItem = require("./OrderItem");

test("OrderItem is defined", () => {
	expect(OrderItem).toBeDefined();
});

test("Bad constructor args throws price related error", () => {
	try {
		new OrderItem();
	} catch (error) {
		expect(error.message).toEqual(
			"Item undefined does not have a valid price: undefined"
		);
	}
});

test("Bad item price throws an error", () => {
	try {
		new OrderItem("P1");
	} catch (error) {
		expect(error.message).toEqual(
			"Item P1 does not have a valid price: undefined"
		);
	}

	try {
		new OrderItem("P2", "no good");
	} catch (error) {
		expect(error.message).toEqual(
			"Item P2 does not have a valid price: no good"
		);
	}
});

test("Bad item quantity throws an error", () => {
	try {
		new OrderItem("P1", 0);
	} catch (error) {
		expect(error.message).toEqual(
			"Item P1 does not have a valid quantity: undefined"
		);
	}

	try {
		new OrderItem("P2", 0, "no good");
	} catch (error) {
		expect(error.message).toEqual(
			"Item P2 does not have a valid quantity: no good"
		);
	}
});

test("OrderItem's computeItemTotal  is defined", () => {
	expect(new OrderItem("", 0, 0).computeItemTotal).toBeDefined();
});

test("Bad item quantity throws an error", () => {
	expect(new OrderItem("P1", 0, 0).computeItemTotal()).toBe(0);
	expect(new OrderItem("P2", 1, 0).computeItemTotal()).toBe(0);
	expect(new OrderItem("P3", 0, 1).computeItemTotal()).toBe(0);
	expect(new OrderItem("P4", 1, 1).computeItemTotal()).toBe(1);
	expect(new OrderItem("P5", 1, 2).computeItemTotal()).toBe(2);
	expect(new OrderItem("P5", 1.5, 2).computeItemTotal()).toBe(3);
	expect(new OrderItem("P5", -1.5, 2).computeItemTotal()).toBe(-3);
	expect(new OrderItem("P5", -1.5, -2).computeItemTotal()).toBe(3);
});
