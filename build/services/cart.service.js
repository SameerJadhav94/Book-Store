"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = _interopRequireDefault(require("../models/cart.model"));

var _book2 = _interopRequireDefault(require("../models/book.model"));

/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
var addToCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cart) {
    var bookData, checkCart, finalQuantity, bookPrice, priceArray, totalPrice, i, finalPrice, data, book, updatedData, _bookPrice, _data, _book, _updatedData;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _book2["default"].findById({
              _id: cart.bookId
            });

          case 3:
            bookData = _context.sent;

            if (!(bookData.quantity === 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", "".concat(bookData.title, " is currently out of stock, please come back later."));

          case 8:
            if (!(cart.quantity > bookData.quantity)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", "Please select quantity less than ".concat(bookData.quantity, "."));

          case 12:
            _context.next = 14;
            return _cart["default"].findOne();

          case 14:
            checkCart = _context.sent;

            if (!checkCart) {
              _context.next = 34;
              break;
            }

            //Adding the quantity of the book
            checkCart.totalQuantity = checkCart.totalQuantity + cart.quantity;
            finalQuantity = checkCart.totalQuantity; //Price of books for the quantity

            bookPrice = cart.quantity * bookData.price; //Total Price of books in the cart

            priceArray = checkCart.prices;
            priceArray.push(bookPrice);
            totalPrice = 0;

            for (i = 0; i <= priceArray.length - 1; i++) {
              totalPrice = totalPrice + priceArray[i];
            }

            finalPrice = totalPrice; //Object

            data = {
              userId: cart.userId,
              bookId: [].concat((0, _toConsumableArray2["default"])(checkCart.bookId), [cart.bookId]),
              bookName: [].concat((0, _toConsumableArray2["default"])(checkCart.bookName), [bookData.title]),
              quantityPerBook: [].concat((0, _toConsumableArray2["default"])(checkCart.quantityPerBook), [cart.quantity]),
              totalQuantity: finalQuantity,
              prices: (0, _toConsumableArray2["default"])(checkCart.prices),
              total: finalPrice,
              isPurchased: false
            }; //Mongoose query to update the cart

            _context.next = 27;
            return _cart["default"].findByIdAndUpdate({
              _id: checkCart._id
            }, data, {
              "new": true
            });

          case 27:
            book = _context.sent;
            //Update The Book Quantity In The Inventory
            updatedData = {
              author: bookData.author,
              title: bookData.title,
              image: bookData.image,
              quantity: bookData.quantity - cart.quantity,
              price: bookData.price,
              description: bookData.description
            };
            _context.next = 31;
            return _book2["default"].findByIdAndUpdate(bookData._id, updatedData, {
              "new": true
            });

          case 31:
            return _context.abrupt("return", book);

          case 34:
            //Price of books for the quantity
            _bookPrice = cart.quantity * bookData.price; //Object

            _data = {
              userId: cart.userId,
              bookId: [cart.bookId],
              bookName: [bookData.title],
              quantityPerBook: [cart.quantity],
              totalQuantity: cart.quantity,
              prices: [_bookPrice],
              total: _bookPrice,
              isPurchased: false
            }; //Mongoose query to create a cart if the cart is empty.

            _context.next = 38;
            return _cart["default"].create(_data);

          case 38:
            _book = _context.sent;
            //Update The Book Quantity In The Inventory
            _updatedData = {
              author: bookData.author,
              title: bookData.title,
              image: bookData.image,
              quantity: bookData.quantity - cart.quantity,
              price: bookData.price,
              description: bookData.description
            };
            _context.next = 42;
            return _book2["default"].findByIdAndUpdate(bookData._id, _updatedData, {
              "new": true
            });

          case 42:
            return _context.abrupt("return", _book);

          case 43:
            _context.next = 48;
            break;

          case 45:
            _context.prev = 45;
            _context.t0 = _context["catch"](0);
            throw new Error("Cannot add the book to cart!");

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 45]]);
  }));

  return function addToCart(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addToCart = addToCart;