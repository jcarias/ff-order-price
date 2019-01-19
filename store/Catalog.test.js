const Catalog = require("./Catalog");

test("Catalog is defined", () => {
  expect(Catalog).toBeDefined();
});

test("Catalog's 'addItem' method is defined", () => {
  expect(new Catalog().addItem).toBeDefined();
});

test("Catalog's 'findItem' method is defined", () => {
  expect(new Catalog().findItem).toBeDefined();
});

test("Add null item to Catalog", () => {
  expect(() => new Catalog().addItem()).toThrow();
});

test("Find item with id='1' in Catalog", () => {
  let catalog = new Catalog();
  catalog.addItem({ id: "a" });
  catalog.addItem({ id: "b" });
  catalog.addItem({ id: "1" });
  expect(catalog.findItem("1")).toEqual({ id: "1" });
});

test("Do not find item with id='x' in Catalog", () => {
  let catalog = new Catalog();
  catalog.addItem({ id: "a" });
  catalog.addItem({ id: "b" });
  catalog.addItem({ id: "1" });
  expect(() => catalog.findItem("x")).toThrowError(
    "Error: item 'x' was not found in catalog!"
  );
});
