const fs = require("fs");
const Catalog = require("./App/store/Catalog");
const Order = require("./App/orders/Order");
const AppUtils = require("./App/App");

const USAGE_MESSAGE =
  "CalculateOrder Path_to_catalog Product1 Quantity_P1 <Product2 Quantity_P2> ...";
const VAT = 23.0;

function parseUserInputItems(userInputItems) {
  let items = [];
  for (let i = 0; i < userInputItems.length; i += 2) {
    let item = {
      id: userInputItems[i],
      orderQuantity: userInputItems[i + 1]
    };
    items.push(item);
  }

  return items;
}

function run() {
  const args = process.argv;
  const catalogFile = args[2];
  let catalog = new Catalog();

  if (args.length < 5) {
    throw new Error("Too few arguments.");
  }

  let data = AppUtils.loadCatalogFromFile(catalogFile);
  data.forEach(element => {
    catalog.addItem(element);
  });

  const userInputItems = args.slice(3, args.length);
  let userItems = parseUserInputItems(userInputItems);
  let ordersItems = AppUtils.buildOrderItems(catalog, userItems);
  //Compute order
  let order = new Order(ordersItems, VAT);
  console.log(`Total: ${order.getOrderTotal()}`);
}

try {
  run();
} catch (error) {
  process.exitCode = 1;
  console.log(`There was a problem: ${error.message}`);
  console.log(`\n\nUsage:\n\n${USAGE_MESSAGE}`);
}
