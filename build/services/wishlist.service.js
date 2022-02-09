"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromWishList = exports.addToWishlist = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _wishlist = _interopRequireDefault(require("../models/wishlist.model"));

var _book2 = _interopRequireDefault(require("../models/book.model"));

/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
var addToWishlist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, List) {
    var listCheck, bookData, book, flag, index, data, _book, _data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _wishlist["default"].findOne();

          case 3:
            listCheck = _context.sent;
            _context.next = 6;
            return _book2["default"].findById(id);

          case 6:
            bookData = _context.sent;

            if (!listCheck) {
              _context.next = 22;
              break;
            }

            book = {
              bookId: bookData._id,
              bookName: bookData.title,
              image: bookData.image,
              price: bookData.price
            };
            List.books = [].concat((0, _toConsumableArray2["default"])(listCheck.books), [book]);
            flag = false;

            for (index = 0; index < listCheck.books.length; index++) {
              if (id === listCheck.books[index].bookId.toString()) {
                flag = true;
              }
            }

            if (!(flag === true)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", 'Book Already Exist');

          case 16:
            _context.next = 18;
            return _wishlist["default"].findByIdAndUpdate(listCheck._id, List, {
              "new": true
            });

          case 18:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 20:
            _context.next = 29;
            break;

          case 22:
            _book = {
              bookId: bookData._id,
              bookName: bookData.title,
              image: bookData.image,
              price: bookData.price
            };
            List.books = [_book];
            _context.next = 26;
            return _wishlist["default"].create(List);

          case 26:
            _data = _context.sent;
            console.log(_data);
            return _context.abrupt("return", _data);

          case 29:
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", 'Cannot add to wishlist');

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 31]]);
  }));

  return function addToWishlist(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addToWishlist = addToWishlist;

var removeFromWishList = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var wishlist, updatedlist;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _wishlist["default"].findOne();

          case 3:
            wishlist = _context2.sent;
            _context2.next = 6;
            return _wishlist["default"].findByIdAndUpdate({
              _id: wishlist._id
            }, {
              $pull: {
                books: {
                  bookId: id
                }
              }
            }, {
              "new": true
            });

          case 6:
            updatedlist = _context2.sent;
            console.log(updatedlist); // console.log(wishlist);

            return _context2.abrupt("return", updatedlist);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", 'Cannot remove from wishlist');

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function removeFromWishList(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeFromWishList = removeFromWishList;