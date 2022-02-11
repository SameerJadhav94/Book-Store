"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var cartController = _interopRequireWildcard(require("../controllers/cart.controller"));

var _auth = require("../middlewares/auth.middleware");

var _cart2 = require("../validators/cart.validator");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable prettier/prettier */
var cartRouter = _express["default"].Router(); //route to add book to cart


cartRouter.post('/:_id', _auth.userAuth, _cart2.newCartValidator, cartController.addToCart); //route to remove book from cart

cartRouter.put('/', _auth.userAuth, cartController.removeBookFromCart); //route to confirm booking

cartRouter.put('/:_id', _auth.userAuth, cartController.confirmBooking); //route to view cart

cartRouter.get('/', _auth.userAuth, cartController.viewCart);
var _default = cartRouter;
exports["default"] = _default;