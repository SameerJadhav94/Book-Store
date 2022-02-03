"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var userController = _interopRequireWildcard(require("../controllers/user.controller"));

var bookController = _interopRequireWildcard(require("../controllers/book.controller"));

var _user2 = require("../validators/user.validator");

var _bookValidator = require("../validators/bookValidator");

var _auth = require("../middlewares/auth.middleware");

var _upload = require("../middlewares/upload");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //routes for user to register


router.post('/user', _user2.newUserValidator, (0, _auth.setRole)('user'), userController.register); //routes for admin to register

router.post('/admin', _user2.newUserValidator, (0, _auth.setRole)('admin'), userController.register); //route to login

router.post('/login', _user2.loginValidator, userController.login); //route for forgot password

router.post('/forgotpassword', _user2.emailValidator, userController.forgotPassword); //route to reset password

router.patch('/resetpassword', _user2.resetPasswordValidator, userController.resetPassword); //route to add book

router.post('/book', _auth.userAuth, _auth.userRole, _upload.upload.single('image'), _bookValidator.newBookValidator, bookController.addBook); //route to get book

router.get('/book', _auth.userAuth, bookController.getBook); //route to get book by id

router.get('/book/:_id', _auth.userAuth, bookController.getBookById); //route to update book by id

router.put('/book/:_id', _auth.userAuth, _auth.userRole, _upload.upload.single('image'), _bookValidator.newBookValidator, bookController.updateBookById); //route to delete book by id

router["delete"]('/book/:_id', _auth.userAuth, _auth.userRole, bookController.deleteBookById);
var _default = router;
exports["default"] = _default;