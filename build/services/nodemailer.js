"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _otp = _interopRequireDefault(require("../models/otp"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

/* eslint-disable prettier/prettier */
_dotenv["default"].config();

exports.sendEmail = function (messageMail) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateString(length) {
    var result = '';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  var otpString = generateString(5);
  var otpData = new _otp["default"]({
    email: messageMail.email,
    code: otpString,
    expireIn: new Date().getTime() + 300 * 1000
  });
  otpData.save();

  var transporter = _nodemailer["default"].createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  var message = {
    from: process.env.EMAIL,
    to: messageMail.email,
    subject: 'Recovery code for your Book-Store Account',
    html: "<div style=\"text-align: center\"><h4>Your one time password (OTP)<br>".concat(otpString, "</h4>\n    <h5>Security Tip - If you did not request this OTP, or if you feel someone else may be trying to login to your account,\n     please change your password immediately.</h5></div>")
  };
  transporter.sendMail(message, function (err, result) {
    if (err) {
      return err;
    }

    return result.response;
  });
};