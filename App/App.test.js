const App = require("./App");
const testCatalog = [{}];
const userItems = [];

test("App is Defined", () => expect(App).toBeDefined());

test("App.loadCatalogFromFile is Defined", () =>
  expect(App.loadCatalogFromFile).toBeDefined());

test("App.loadCatalogFromFile file does not exist throws error", () => {
  expect(() => App.loadCatalogFromFile("./unknown.txt")).toThrow(
    "Catalog file './unknown.txt' not found!"
  );
});

test("App.buildOrderItems is Defined", () =>
  expect(App.buildOrderItems).toBeDefined());
