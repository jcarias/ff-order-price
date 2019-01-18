class OrderItem {
	constructor(id, price, quantity) {
		this.id = id;
		this.price = price;
		this.quantity = quantity;
	}

	computeItemTotal() {
		return this.price * this.quantity;
	}
}

module.exports = OrderItem;
