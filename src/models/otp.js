/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
const otpSchema = Schema(
  {
    email: String,
    code: String,
    expireIn: Number
  },
  {
    timestamp: true
  }
);

const otp = model('otp', otpSchema);
export default otp;
