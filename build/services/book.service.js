"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBook = exports.addBook = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _book = _interopRequireDefault(require("../models/book.model"));

/* eslint-disable prettier/prettier */
var addBook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _book["default"].create(body);
            return _context.abrupt("return", data);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addBook(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addBook = addBook;

var getBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _book["default"].find();
            return _context2.abrupt("return", data);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getBook() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getBook = getBook;