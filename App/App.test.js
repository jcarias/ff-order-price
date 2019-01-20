const App = require("./App");
const Catalog = require("./store/Catalog");
const OrderItem = require("./orders/OrderItem");

const initCatalog = () => {
  let catalog = new Catalog();
  catalog.addItem({ id: "P1", stock: 5, price: 1000.0 });
  catalog.addItem({ id: "P2", stock: 8, price: 250.0 });
  catalog.addItem({ id: "P3", stock: 15, price: 125.0 });
  catalog.addItem({ id: "P4", stock: 10, price: 250.0 });
  catalog.addItem({ id: "P5", stock: 2, price: 2500.0 });
  return catalog;
};
let catalog = initCatalog();

test("App is Defined", () => expect(App).toBeDefined());

test("App.loadCatalogDataFromFile is Defined", () =>
  expect(App.loadCatalogDataFromFile).toBeDefined());

test("App.loadCatalogDataFromFile file does not exist throws error", () => {
  expect(() => App.loadCatalogDataFromFile("./unknown.txt")).toThrow(
    "Catalog file './unknown.txt' not found!"
  );
});

test("App.catalogItemLookup is Defined", () =>
  expect(App.catalogItemLookup).toBeDefined());

test("App.catalogItemLookup tests on OK Catalog", () => {
  expect(
    App.catalogItemLookup(catalog, { id: "P1", orderQuantity: 4 })
  ).toEqual({ id: "P1", price: 1000.0, quantity: 4 });

  expect(
    App.catalogItemLookup(catalog, { id: "P3", orderQuantity: 0 })
  ).toEqual({ id: "P3", price: 125.0, quantity: 0 });

  expect(() =>
    App.catalogItemLookup(catalog, { id: "P1", orderQuantity: 40 })
  ).toThrow("Item P1 has less units in stock (5) then those required (40)");

  expect(() =>
    App.catalogItemLookup(catalog, { id: "ABC", orderQuantity: 0 })
  ).toThrow("Error: item 'ABC' was not found in catalog!");
});

const userItems = [{ id: "P4", orderQuantity: 5 }];
const userItemsNotFound = [{ id: "P24", orderQuantity: 5 }];
const userItemsNoStock = [{ id: "P4", orderQuantity: 55 }];
test("App.buildOrderItems is Defined", () =>
  expect(App.buildOrderItems).toBeDefined());

test("App.buildOrderItems item found", () => {
  const order = App.buildOrderItems(catalog, userItems);
  const expected = [new OrderItem("P4", 250, 5)];

  expect(App.buildOrderItems(catalog, userItems)).toEqual(expected);
});

test("App.buildOrderItems item not found", () => {
  expect(() => App.buildOrderItems(catalog, userItemsNotFound)).toThrow();
});

test("App.buildOrderItems item no stock available", () => {
  expect(() => App.buildOrderItems(catalog, userItemsNoStock)).toThrow();
});
