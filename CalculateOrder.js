const fs = require("fs");
const Catalog = require("./Catalog");
const OrderItem = require("./OrderItem");
const Order = require("./Order");

const usageMessage =
  "CalculateOrder Path_to_catalog Product1 Quantity_P1 <Product2 Quantity_P2> ...";

function loadCatalogFromFile(file) {
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
  console.log("Catalog read: ", catalog);
  return catalog;
}

function buildOrderItems(catalog, userData) {
  let userItems = [];

  for (let i = 0; i < userData.length; i += 2) {
    let item = {
      id: userData[i],
      orderQuantity: userData[i + 1]
    };

    userItems.push(item);
  }

  let orderItems = [];
  userItems.forEach(item => {
    console.log("Finding item in catalog:", item);
    let catalogItem = catalog.findItem(item.id);
    if (catalogItem) {
      if (catalogItem.stock >= item.orderQuantity) {
        orderItems.push(
          new OrderItem(item.id, catalogItem.price, item.orderQuantity)
        );
      } else {
        throw new Error(
          `Item ${item.id} has less units in stock (${
            catalogItem.stock
          }) then those required (${item.orderQuantity})`
        );
      }
    }
  });
  console.log("Order item:", userItems);
  return orderItems;
}

function init() {
  const args = process.argv;
  const catalogFile = args[2];
  let catalog = new Catalog();

  if (args.length < 5) {
    throw new Error("Too few arguments.");
  }

  const userArgData = args.slice(3, args.length);

  if (!fs.existsSync(catalogFile)) {
    throw new Error(`Catalog file '${catalogFile}' not found!`);
  } else {
    let data = loadCatalogFromFile(catalogFile);
    data.forEach(element => {
      catalog.addItem(element);
    });
  }

  let orders = buildOrderItems(catalog, userArgData);
  //Compute order
  let order = new Order(orders);
  console.log(`Total: ${order.computeOrderTotal()}`);
}

try {
  init();
} catch (error) {
  process.exitCode = 1;
  console.log(`There was a problem: ${error.message}`);
  console.log(`\n\nUsage:\n\n${usageMessage}`);
}
