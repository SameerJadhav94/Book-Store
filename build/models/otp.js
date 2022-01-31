"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

/* eslint-disable prettier/prettier */
var otpSchema = (0, _mongoose.Schema)({
  email: String,
  code: String,
  expireIn: Number
}, {
  timestamp: true
});
var otp = (0, _mongoose.model)('otp', otpSchema);
var _default = otp;
exports["default"] = _default;