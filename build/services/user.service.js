"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.registration = exports.login = exports.forgotPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _otp = _interopRequireDefault(require("../models/otp"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _nodemailer = _interopRequireDefault(require("./nodemailer"));

_dotenv["default"].config(); //register user


var registration = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var salt, hash, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].genSalt(12);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return _bcrypt["default"].hash(body.password, salt);

          case 5:
            hash = _context.sent;
            body.password = hash;
            _context.next = 9;
            return _user["default"].create(body);

          case 9:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function registration(_x) {
    return _ref.apply(this, arguments);
  };
}(); //login user


exports.registration = registration;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, payload, token, validatePassword;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            data = _context2.sent;
            payload = {
              _id: data._id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              role: data.role
            };
            token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
              expiresIn: '100H'
            });
            _context2.next = 7;
            return _bcrypt["default"].compare(body.password, data.password);

          case 7:
            validatePassword = _context2.sent;

            if (!validatePassword) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", token);

          case 12:
            throw new Error('Invalid user');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); //forgot password


exports.login = login;

var forgotPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user["default"].findOne({
              email: body.email
            });

          case 3:
            data = _context3.sent;

            if (data) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", 'Email does not exist');

          case 8:
            _nodemailer["default"].sendEmail(body);

            return _context3.abrupt("return", 'Email sent successfully');

          case 10:
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", _context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function forgotPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}(); //reset password


exports.forgotPassword = forgotPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var data, salt, resetedPassword;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _otp["default"].findOne({
              email: body.email,
              code: body.code
            });

          case 3:
            data = _context4.sent;

            if (!data) {
              _context4.next = 21;
              break;
            }

            _context4.next = 7;
            return _bcrypt["default"].genSalt(12);

          case 7:
            salt = _context4.sent;
            _context4.next = 10;
            return _bcrypt["default"].hash(body.password, salt);

          case 10:
            body.password = _context4.sent;
            _context4.next = 13;
            return _user["default"].updateOne({
              email: body.email
            }, {
              $set: {
                password: body.password
              }
            });

          case 13:
            resetedPassword = _context4.sent;

            if (resetedPassword) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", 'Could Not Reset Password');

          case 18:
            return _context4.abrupt("return", resetedPassword);

          case 19:
            _context4.next = 22;
            break;

          case 21:
            return _context4.abrupt("return", 'Check The Otp Entered');

          case 22:
            _context4.next = 27;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", _context4.t0);

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 24]]);
  }));

  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;