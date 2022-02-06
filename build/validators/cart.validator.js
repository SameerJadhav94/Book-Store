"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCartValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

/* eslint-disable prettier/prettier */
var newCartValidator = function newCartValidator(req, res, next) {
  var schema = _joi["default"].object({
    quantity: _joi["default"].number().required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newCartValidator = newCartValidator;