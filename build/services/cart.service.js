"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBookFromCart = exports.addToCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = _interopRequireDefault(require("../models/cart.model"));

var _book2 = _interopRequireDefault(require("../models/book.model"));

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
            return _cart["default"].findOne();

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

            if (!(body.quantity > cartData.quantityPerBook[index])) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", 'Invalid quantity.');

          case 18:
            if (!(cartData.quantityPerBook[index] - body.quantity !== 0)) {
              _context2.next = 45;
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
            if (!(data.total === 0)) {
              _context2.next = 42;
              break;
            }

            _context2.next = 41;
            return _cart["default"].findByIdAndDelete(cartData._id);

          case 41:
            return _context2.abrupt("return", 'The cart is empty.');

          case 42:
            return _context2.abrupt("return", data);

          case 45:
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
            _context2.next = 57;
            return _cart["default"].findByIdAndUpdate(cartData._id, _updatedCartData, {
              "new": true
            });

          case 57:
            _data2 = _context2.sent;
            _context2.next = 60;
            return _book2["default"].findById({
              _id: _idOfBookToUpdate
            });

          case 60:
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
            _context2.next = 64;
            return _book2["default"].findByIdAndUpdate(_idOfBookToUpdate, _updatedBookData, {
              "new": true
            });

          case 64:
            if (!(_data2.total === 0)) {
              _context2.next = 68;
              break;
            }

            _context2.next = 67;
            return _cart["default"].findByIdAndDelete(cartData._id);

          case 67:
            return _context2.abrupt("return", 'The cart is empty.');

          case 68:
            return _context2.abrupt("return", _data2);

          case 69:
            _context2.next = 74;
            break;

          case 71:
            _context2.prev = 71;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", 'Cannot remove book from cart');

          case 74:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 71]]);
  }));

  return function removeBookFromCart(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeBookFromCart = removeBookFromCart;