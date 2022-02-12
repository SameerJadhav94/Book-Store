"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBookById = exports.searchBook = exports.priceLowToHighSort = exports.priceHighToLowSort = exports.getBookById = exports.getBook = exports.descendingOrder = exports.deleteBookById = exports.ascendingOrder = exports.alphabeticalOrder = exports.addBook = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _book = _interopRequireDefault(require("../models/book.model"));

/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
//add book
var addBook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _book["default"].create(body);

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addBook(_x) {
    return _ref.apply(this, arguments);
  };
}(); //get book


exports.addBook = addBook;

var getBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _book["default"].find();

          case 2:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getBook() {
    return _ref2.apply(this, arguments);
  };
}(); //get book by id


exports.getBook = getBook;

var getBookById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _book["default"].findById(id);

          case 2:
            data = _context3.sent;
            return _context3.abrupt("return", data);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getBookById(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); //update book by id


exports.getBookById = getBookById;

var updateBookById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _book["default"].findByIdAndUpdate(id, body, {
              "new": true
            });

          case 2:
            data = _context4.sent;
            return _context4.abrupt("return", data);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateBookById(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}(); //delete book by id


exports.updateBookById = updateBookById;

var deleteBookById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _book["default"].findByIdAndDelete(id);

          case 2:
            data = _context5.sent;
            return _context5.abrupt("return", data);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteBookById(_x5) {
    return _ref5.apply(this, arguments);
  };
}(); //search book


exports.deleteBookById = deleteBookById;

var searchBook = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(bookName) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _book["default"].find({
              $or: [{
                title: {
                  $regex: bookName,
                  $options: 'i'
                }
              }]
            });

          case 3:
            data = _context6.sent;
            return _context6.abrupt("return", data);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", 'Problem Occured');

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function searchBook(_x6) {
    return _ref6.apply(this, arguments);
  };
}(); //sort order in ascending order


exports.searchBook = searchBook;

var ascendingOrder = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _book["default"].find();

          case 2:
            data = _context7.sent;
            return _context7.abrupt("return", data);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function ascendingOrder() {
    return _ref7.apply(this, arguments);
  };
}(); //sort order in descending order


exports.ascendingOrder = ascendingOrder;

var descendingOrder = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _book["default"].find().sort({
              updatedAt: -1
            });

          case 2:
            data = _context8.sent;
            return _context8.abrupt("return", data);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function descendingOrder() {
    return _ref8.apply(this, arguments);
  };
}(); //sort order in alphabetical order


exports.descendingOrder = descendingOrder;

var alphabeticalOrder = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var data;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _book["default"].find({
              'title': {
                '$exists': true
              }
            }).sort({
              'title': 1
            });

          case 2:
            data = _context9.sent;
            return _context9.abrupt("return", data);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function alphabeticalOrder() {
    return _ref9.apply(this, arguments);
  };
}(); //sort order of books as per price from low to high


exports.alphabeticalOrder = alphabeticalOrder;

var priceLowToHighSort = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var data;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _book["default"].find({
              'price': {
                '$exists': true
              }
            }).sort({
              'price': 1
            });

          case 2:
            data = _context10.sent;
            return _context10.abrupt("return", data);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function priceLowToHighSort() {
    return _ref10.apply(this, arguments);
  };
}(); //sort order of books as per price from high to low


exports.priceLowToHighSort = priceLowToHighSort;

var priceHighToLowSort = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var data;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _book["default"].find({
              'price': {
                '$exists': true
              }
            }).sort({
              'price': -1
            });

          case 2:
            data = _context11.sent;
            return _context11.abrupt("return", data);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function priceHighToLowSort() {
    return _ref11.apply(this, arguments);
  };
}();

exports.priceHighToLowSort = priceHighToLowSort;