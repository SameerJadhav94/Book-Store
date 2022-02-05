"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _user = _interopRequireDefault(require("./user.model"));

var _book = _interopRequireDefault(require("./book.model"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable prettier/prettier */

/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
var cartSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  bookId: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Book'
  }],
  bookName: [{
    type: String,
    required: true
  }],
  quantity: {
    type: Number,
    required: true
  },
  prices: [{
    type: Number,
    required: true
  }],
  total: {
    type: Number,
    required: true
  },
  isPurchased: {
    type: Boolean,
    "default": false
  }
});
var Cart = (0, _mongoose.model)('Cart', cartSchema);
var _default = Cart;
exports["default"] = _default;