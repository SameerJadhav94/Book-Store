"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = exports.loginValidator = exports.emailValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

/* eslint-disable max-len */
var newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(2).max(30).required().pattern(/^[A-Z]{1}[a-z]{1,}$/),
    lastName: _joi["default"].string().alphanum().min(3).max(30).required().pattern(/^[A-Z]{1}[a-z]{2,}$/),
    email: _joi["default"].string().pattern(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/).required(),
    password: _joi["default"].string().pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).required()
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

exports.newUserValidator = newUserValidator;

var loginValidator = function loginValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().pattern(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/).required(),
    password: _joi["default"].string().required().pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error,
      value = _schema$validate2.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.loginValidator = loginValidator;

var emailValidator = function emailValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().pattern(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/).required()
  });

  var _schema$validate3 = schema.validate(req.body),
      error = _schema$validate3.error,
      value = _schema$validate3.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.emailValidator = emailValidator;