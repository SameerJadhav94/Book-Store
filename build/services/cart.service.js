"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewCart = exports.removeBookFromCart = exports.confirmBooking = exports.addToCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = _interopRequireDefault(require("../models/cart.model"));

var _book2 = _interopRequireDefault(require("../models/book.model"));

var _logger = _interopRequireDefault(require("../config/logger"));

/* eslint-disable prettier/prettier */

/* eslint-disable no-trailing-spaces */

/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */

/**
 * Service For Add To Cart
 * @param {object} cart cart object
 * @returns
 */
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
            return _cart["default"].findOne({
              userId: cart.userId
            });

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
            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t0 = _context["catch"](0);

            _logger["default"].error(_context.t0);

            throw new Error("Cannot add the book to cart!");

          case 49:
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
/**
 * Service for Remove From Cart
 * @param {object} body - body object
 * @returns
 */


exports.addToCart = addToCart;

var removeBookFromCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var cartData, BookNameArray, IdArray, QtyArray, PricesArray, index, currentQty, totalPrice, i, finalPrice, updatedCartData, data, idOfBookToUpdate, bookData, updatedBookData, _idOfBookToUpdate, _totalPrice, _i, _finalPrice, _updatedCartData, _data2, _bookData, _updatedBookData;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _cart["default"].findOne({
              userId: body.userId
            });

          case 3:
            cartData = _context2.sent;

            if (cartData) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", 'Cart is empty.');

          case 8:
            //Cloning the arrays
            BookNameArray = (0, _toConsumableArray2["default"])(cartData.bookName);
            IdArray = (0, _toConsumableArray2["default"])(cartData.bookId);
            QtyArray = (0, _toConsumableArray2["default"])(cartData.quantityPerBook);
            PricesArray = (0, _toConsumableArray2["default"])(cartData.prices); //Getting The Index

            index = BookNameArray.indexOf(body.title);
            currentQty = cartData.quantityPerBook[index] - body.quantity;

            if (!(body.quantity > cartData.quantityPerBook[index] || body.quantity > cartData.totalQuantity)) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", 'Invalid quantity.');

          case 18:
            if (!(cartData.quantityPerBook[index] - body.quantity !== 0)) {
              _context2.next = 41;
              break;
            }

            BookNameArray[index] = body.title;
            IdArray[index] = cartData.bookId[index];
            QtyArray[index] = currentQty;
            PricesArray[index] = cartData.prices[index] / cartData.quantityPerBook[index] * currentQty;
            cartData.totalQuantity = cartData.totalQuantity - body.quantity;
            totalPrice = 0;

            for (i = 0; i <= PricesArray.length - 1; i++) {
              totalPrice = totalPrice + PricesArray[i];
            }

            finalPrice = totalPrice;
            updatedCartData = {
              userId: body.userId,
              bookId: IdArray,
              bookName: BookNameArray,
              quantityPerBook: QtyArray,
              totalQuantity: cartData.totalQuantity,
              prices: PricesArray,
              total: finalPrice,
              isPurchased: false
            };
            _context2.next = 30;
            return _cart["default"].findByIdAndUpdate(cartData._id, updatedCartData, {
              "new": true
            });

          case 30:
            data = _context2.sent;
            idOfBookToUpdate = cartData.bookId[index];
            _context2.next = 34;
            return _book2["default"].findById({
              _id: idOfBookToUpdate
            });

          case 34:
            bookData = _context2.sent;
            updatedBookData = {
              author: bookData.author,
              title: bookData.title,
              image: bookData.image,
              quantity: bookData.quantity + body.quantity,
              price: bookData.price,
              description: bookData.description
            };
            _context2.next = 38;
            return _book2["default"].findByIdAndUpdate(idOfBookToUpdate, updatedBookData, {
              "new": true
            });

          case 38:
            return _context2.abrupt("return", data);

          case 41:
            _idOfBookToUpdate = cartData.bookId[index]; //Deleting Data from Particular Index

            BookNameArray.splice(index, 1);
            IdArray.splice(index, 1);
            QtyArray.splice(index, 1);
            PricesArray.splice(index, 1);
            cartData.totalQuantity = cartData.totalQuantity - body.quantity; //Calculating Total Price

            _totalPrice = 0;

            for (_i = 0; _i <= PricesArray.length - 1; _i++) {
              _totalPrice = _totalPrice + PricesArray[_i];
            }

            _finalPrice = _totalPrice; //Object To Update Cart

            _updatedCartData = {
              userId: body.userId,
              bookId: IdArray,
              bookName: BookNameArray,
              quantityPerBook: QtyArray,
              totalQuantity: cartData.totalQuantity,
              prices: PricesArray,
              total: _finalPrice,
              isPurchased: false
            };
            _context2.next = 53;
            return _cart["default"].findByIdAndUpdate(cartData._id, _updatedCartData, {
              "new": true
            });

          case 53:
            _data2 = _context2.sent;
            _context2.next = 56;
            return _book2["default"].findById({
              _id: _idOfBookToUpdate
            });

          case 56:
            _bookData = _context2.sent;
            //Object To Update Main Inventory
            _updatedBookData = {
              author: _bookData.author,
              title: _bookData.title,
              image: _bookData.image,
              quantity: _bookData.quantity + body.quantity,
              price: _bookData.price,
              description: _bookData.description
            };
            _context2.next = 60;
            return _book2["default"].findByIdAndUpdate(_idOfBookToUpdate, _updatedBookData, {
              "new": true
            });

          case 60:
            return _context2.abrupt("return", _data2);

          case 61:
            _context2.next = 67;
            break;

          case 63:
            _context2.prev = 63;
            _context2.t0 = _context2["catch"](0);

            _logger["default"].error(_context2.t0);

            return _context2.abrupt("return", 'Cannot remove book from cart');

          case 67:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 63]]);
  }));

  return function removeBookFromCart(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Service for confirm booking
 * @param {id} id cart's id
 * @returns 
 */


exports.removeBookFromCart = removeBookFromCart;

var confirmBooking = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var checkCart, data, checkout;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _cart["default"].findById(id);

          case 3:
            checkCart = _context3.sent;

            if (!(checkCart.totalQuantity === 0)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", 'Add The Book.');

          case 8:
            data = {
              userId: checkCart.userId,
              bookId: [],
              bookName: [],
              quantityPerBook: [],
              totalQuantity: 0,
              prices: [],
              total: 0,
              isPurchased: true
            };
            _context3.next = 11;
            return _cart["default"].findByIdAndUpdate(id, data, {
              "new": true
            });

          case 11:
            checkout = _context3.sent;
            return _context3.abrupt("return", checkout);

          case 13:
            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);

            _logger["default"].error(_context3.t0);

            return _context3.abrupt("return", 'Cannot check out your order.');

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 15]]);
  }));

  return function confirmBooking(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Service for view cart
 * @param id- user id
 * @returns 
 */


exports.confirmBooking = confirmBooking;

var viewCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var cart;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _cart["default"].findOne({
              userId: id.userId
            });

          case 3:
            cart = _context4.sent;
            return _context4.abrupt("return", cart);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            _logger["default"].error(_context4.t0);

            return _context4.abrupt("return", 'Cannot view your cart');

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function viewCart(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.viewCart = viewCart;