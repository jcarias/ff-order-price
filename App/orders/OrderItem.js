class OrderItem {
	constructor(id, price, quantity) {
		this.id = id;
		if (isNaN(price)) {
			throw new Error(`Item ${id} does not have a valid price: ${price}`);
		}
		this.price = price;
		if (isNaN(quantity)) {
			throw new Error(
				`Item ${id} does not have a valid quantity: ${quantity}`
			);
		}
		this.quantity = quantity;
	}

	computeItemTotal() {
		return this.price * this.quantity;
	}
}

module.exports = OrderItem;
