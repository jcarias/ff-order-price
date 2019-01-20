const fs = require("fs");
const OrderItem = require("./orders/OrderItem");

function loadCatalogFromFile(file) {
  if (!file) {
    throw new Error("No file supplied");
  }

  if (!fs.existsSync(file)) {
    throw new Error(`Catalog file '${file}' not found!`);
  }

  let data = fs.readFileSync(file, "UTF-8");

  let lines = data.split(/\r?\n/);

  let catalog = [];

  if (lines.length > 0) {
    lines.map(line => {
      let rowValues = line.split(/,/);
      if (rowValues.length >= 3) {
        catalog.push({
          id: rowValues[0],
          stock: rowValues[1],
          price: rowValues[2]
        });
      }
    });
  }
  return catalog;
}

function buildOrderItems(catalog, userItems) {
  let orderItems = [];
  userItems.forEach(item => {
    let orderItem = catalogItemLookup(catalog, item);
    orderItems.push(orderItem);
  });

  return orderItems;
}

function catalogItemLookup(catalog, item) {
  let catalogItem = catalog.findItem(item.id);
  if (catalogItem) {
    if (catalogItem.stock >= item.orderQuantity) {
      return new OrderItem(item.id, catalogItem.price, item.orderQuantity);
    } else {
      throw new Error(
        `Item ${item.id} has less units in stock (${
          catalogItem.stock
        }) then those required (${item.orderQuantity})`
      );
    }
  } else {
    throw new Error(`Item '${item.id}' not found in catalog.`);
  }
}

module.exports = {
  loadCatalogDataFromFile: loadCatalogFromFile,
  buildOrderItems,
  catalogItemLookup
};
