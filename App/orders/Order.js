const OrderItem = require("./OrderItem");

class Order {
  constructor(orderItems, valueAddedTax) {
    this.orderItems = orderItems;
    this.vat = valueAddedTax || 0.0;
    this.getOrderAmount = this.getOrderAmount.bind(this);
    this.getTaxAmount = this.getTaxAmount.bind(this);
  }

  getOrderAmount() {
    if (Array.isArray(this.orderItems)) {
      let total = 0;
      this.orderItems.forEach(orderItem => {
        if (orderItem instanceof OrderItem) {
          total += orderItem.computeItemTotal();
        } else {
          throw new Error("Order item is not a valid order.");
        }
      });

      return total;
    } else {
      throw new Error("Orders is not a valid Order list.");
    }
  }

  getTaxAmount() {
    if (this.vat && !isNaN(this.vat)) {
      return this.getOrderAmount() * (this.vat / 100);
    } else return 0;
  }

  getOrderTotal() {
    return this.getOrderAmount() + this.getTaxAmount();
  }
}

module.exports = Order;
