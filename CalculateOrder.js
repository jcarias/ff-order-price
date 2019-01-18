const fs = require("fs");
const Catalog = require("./Catalog");

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

	return catalog;
}

function processOrderTotal(catalog, orderItems) {
	//TODO: create an array of order items;
}

function init() {
	console.log(process.argv);
	const args = process.argv;
	const catalogFile = args[2];
	let catalog = new Catalog();

	if (args.length < 5) {
		throw new Error("Too few arguments.");
	}

	if (!fs.existsSync(catalogFile)) {
		throw new Error(`Catalog file '${catalogFile}' not found!`);
	} else {
		let data = loadCatalogFromFile(catalogFile);
		data.forEach(element => {
			catalog.addItem(element);
		});
	}

	//TODO: parse input

	//Compute order
}

try {
	init();
} catch (error) {
	process.exitCode = 1;
	console.log(`There was a problem: '${error.message}'`);
	console.log(`\n\nUsage:\n\n${usageMessage}`);
}
