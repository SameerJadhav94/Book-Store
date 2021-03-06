"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user.route"));

var _book = require("./book.route");

var _cart = _interopRequireDefault(require("./cart.route"));

var _search = _interopRequireDefault(require("./search.route"));

var _wishlist = _interopRequireDefault(require("./wishlist.route"));

var router = _express["default"].Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
var routes = function routes() {
  router.get('/', function (req, res) {
    res.json('Welcome');
  });
  router.use('/users', _user["default"]);
  router.use('/book', _book.bookRouter);
  router.use('/ascending', _book.ascendingOrderRouter);
  router.use('/descending', _book.descendingOrderRouter);
  router.use('/alphabetical', _book.alphabeticalOrderRouter);
  router.use('/priceLowToHigh', _book.bookPriceAscendSortRouter);
  router.use('/priceHighToLow', _book.bookPriceDescendSortRouter);
  router.use('/cart', _cart["default"]);
  router.use('/search', _search["default"]);
  router.use('/wishlist', _wishlist["default"]);
  return router;
};

var _default = routes;
exports["default"] = _default;