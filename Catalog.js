class Catalog {
  constructor() {
    this.catalogData = [];
  }

  addItem(item) {
    if (item) {
      this.catalogData.push(item);
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
