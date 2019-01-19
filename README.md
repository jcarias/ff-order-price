# Order Price Exercise

## About

This [NodeJS](https://nodejs.org/) App is able to calculate the total amount of an order by looking up the order items in a supplied catalog file in CSV format.

This app is a **command line** utility.

## Requirements

To run this application, you'll need to have NodeJS (version >= 8) installed in the system.

NodeJS can found at [https://nodejs.org/](https://nodejs.org/).

## Install

In first place, clone the git repository into your system:

```shell
$ git clone https://github.com/jcarias/ff-order-price.git
```

Then, change dir into `ff-order-price` and install the dependencies:

... using `npm`:

```shell
$ npm install
```

... or `yarn`:

```shell
$ yarn install
```

## Usage

To run the utility simply run the following command:

`CalculateOrder <Path_to_catalog> <Product1> <Quantity_P1> [Product2 Quantity_P29] ...`

### Example

Given the input `Catalog.txt` file:

```
P4,10,250.00
P10,5,175.00
P12,5,1000.00
```

```shell
$ node CalculateOrder.js Catalog.txt P4 6 P10 5 P12 1
Total: 4151,25
```

## Usage Requirements

**All conditions must be met** or errors will be thrown. The conditions are:

- The path to catalog file must exist.
- A catalog file must be well formatted.
- The product IDs supplied must exist in the catalog file.
- The product order quantities must be below or equal the stock quantities in the catalog.
