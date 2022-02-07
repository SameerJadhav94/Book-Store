"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBookFromCart = exports.addToCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var CartService = _interopRequireWildcard(require("../services/cart.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable prettier/prettier */
var addToCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var cartData, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            cartData = {
              userId: req.user._id,
              bookId: req.params._id,
              quantity: req.body.quantity
            };
            _context.next = 4;
            return CartService.addToCart(cartData);

          case 4:
            data = _context.sent;
            res.status(_httpStatusCodes["default"].CREATED).json({
              code: _httpStatusCodes["default"].CREATED,
              data: data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function addToCart(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.addToCart = addToCart;

var removeBookFromCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var bookData, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            bookData = {
              userId: req.user._id,
              title: req.body.title,
              quantity: req.body.quantity
            };
            _context2.next = 4;
            return CartService.removeBookFromCart(bookData);

          case 4:
            data = _context2.sent;

            if (data === 'Cart is empty.') {
              res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
                code: _httpStatusCodes["default"].BAD_REQUEST,
                message: 'Your Cart Does Not Have Any Books.'
              });
            } else if (data === 'The cart is empty.') {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'All The Books Has Been Removed From The Cart.'
              });
            } else if (data === 'Cannot remove book from cart') {
              res.status(_httpStatusCodes["default"].INTERNAL_SERVER_ERROR).json({
                code: _httpStatusCodes["default"].INTERNAL_SERVER_ERROR,
                message: 'Problem occured while removing book from cart.'
              });
            } else {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                data: data,
                message: 'Book has been removed from cart.'
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function removeBookFromCart(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.removeBookFromCart = removeBookFromCart;