"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.resetPassword = exports.registration = exports.login = exports.getUser = exports.forgotPassword = exports.deleteUser = void 0;

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
    var data, token, validatePassword;
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
            token = _jsonwebtoken["default"].sign({
              email: body.email
            }, process.env.SECRET_KEY, {
              expiresIn: '100H'
            });
            _context2.next = 6;
            return _bcrypt["default"].compare(body.password, data.password);

          case 6:
            validatePassword = _context2.sent;

            if (!validatePassword) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", token);

          case 11:
            throw new Error('Invalid user');

          case 12:
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
              _context4.next = 22;
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
            console.log(resetedPassword);

            if (resetedPassword) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt("return", 'Could Not Reset Password');

          case 19:
            return _context4.abrupt("return", resetedPassword);

          case 20:
            _context4.next = 23;
            break;

          case 22:
            return _context4.abrupt("return", 'Check The Code Entered');

          case 23:
            _context4.next = 28;
            break;

          case 25:
            _context4.prev = 25;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", _context4.t0);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 25]]);
  }));

  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}(); //update single user


exports.resetPassword = resetPassword;

var updateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user["default"].findByIdAndUpdate({
              _id: _id
            }, body, {
              "new": true
            });

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

  return function updateUser(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}(); //delete single user


exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user["default"].findByIdAndDelete(id);

          case 2:
            return _context6.abrupt("return", '');

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteUser(_x7) {
    return _ref6.apply(this, arguments);
  };
}(); //get single user


exports.deleteUser = deleteUser;

var getUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findById(id);

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

  return function getUser(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getUser = getUser;