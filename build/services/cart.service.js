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
    var bookData, checkCart, finalQuantity, bookPrice, priceArray, totalPrice, i, finalPrice, data, book, updatedData, updateInventory, _bookPrice, _data, _book, _updatedData, _updateInventory;

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

            if (!(cart.quantity > bookData.quantity)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", "Please select quantity less than ".concat(bookData.quantity, "."));

          case 8:
            _context.next = 10;
            return _cart["default"].findOne();

          case 10:
            checkCart = _context.sent;

            if (!checkCart) {
              _context.next = 34;
              break;
            }

            //Adding the quantity of the book
            checkCart.quantity = checkCart.quantity + cart.quantity;
            finalQuantity = checkCart.quantity; //Price of books for the quantity

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
              quantity: finalQuantity,
              prices: (0, _toConsumableArray2["default"])(checkCart.prices),
              total: finalPrice,
              isPurchased: false
            }; //Mongoose query to update the cart

            _context.next = 23;
            return _cart["default"].findByIdAndUpdate({
              _id: checkCart._id
            }, data, {
              "new": true
            });

          case 23:
            book = _context.sent;
            updatedData = {
              author: bookData.author,
              title: bookData.title,
              image: bookData.image,
              quantity: bookData.quantity - cart.quantity,
              price: bookData.price,
              description: bookData.description
            };
            _context.next = 27;
            return _book2["default"].findByIdAndUpdate(bookData._id, updatedData, {
              "new": true
            });

          case 27:
            updateInventory = _context.sent;

            if (!(updateInventory.quantity === 0)) {
              _context.next = 31;
              break;
            }

            _context.next = 31;
            return _book2["default"].findByIdAndDelete(bookData._id);

          case 31:
            return _context.abrupt("return", book);

          case 34:
            //Price of books for the quantity
            _bookPrice = cart.quantity * bookData.price; //Object

            _data = {
              userId: cart.userId,
              bookId: [cart.bookId],
              bookName: [bookData.title],
              quantity: cart.quantity,
              prices: [_bookPrice],
              total: _bookPrice,
              isPurchased: false
            }; //Mongoose query to create a cart if the cart is empty.

            _context.next = 38;
            return _cart["default"].create(_data);

          case 38:
            _book = _context.sent;
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
            _updateInventory = _context.sent;

            if (!(_updateInventory.quantity === 0)) {
              _context.next = 46;
              break;
            }

            _context.next = 46;
            return _book2["default"].findByIdAndDelete(bookData._id);

          case 46:
            return _context.abrupt("return", _book);

          case 47:
            _context.next = 52;
            break;

          case 49:
            _context.prev = 49;
            _context.t0 = _context["catch"](0);
            throw new Error("The Book is out of stock for now, Please try again later.");

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 49]]);
  }));

  return function addToCart(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addToCart = addToCart;