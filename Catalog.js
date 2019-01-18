class Catalog {
	constructor() {
		this.catalogData = [];
	}

	addItem = item => {
		if (item) {
			catalogData.push(item);
		}
	};

	findItemPrice = id => {
		let foundItems = this.catalogData.filter(item => item.id === id);
		if (foundItems.length > 0) {
			return foundItems[0].price;
		}

		throw new Error(`Error: item '${id}' not found in catalog!`);
	};
}
