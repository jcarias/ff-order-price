const OrderItem = require("./OrderItem");

class Order {
	constructor(orders, valueAddedTax) {
		this.orders = orders;
		this.vat = valueAddedTax;
	}

	computeOrderTotal() {
		if (Array.isArray(this.orders)) {
			let total = 0;
			this.orders.forEach(order => {
				if (order instanceof OrderItem) {
					total += order.computeItemTotal();
				} else {
					throw new Error("Order item is not a valid order.");
				}
			});

			return total;
		} else {
			throw new Error("Orders is not a valid Order list.");
		}
	}
}

module.exports = Order;
