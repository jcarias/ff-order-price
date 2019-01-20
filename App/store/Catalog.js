class Catalog {
  constructor() {
    this.catalogData = [];
  }

  addItem(item) {
    if (item) {
      this.catalogData.push(item);
    } else {
      throw new Error("Cannot add an empty object to the catalog.");
    }
  }

  findItem(id) {
    let foundItem = this.catalogData.find(item => item.id === id);
    if (foundItem !== undefined) {
      return foundItem;
    }

    throw new Error(`Error: item '${id}' was not found in catalog!`);
  }
}

module.exports = Catalog;
