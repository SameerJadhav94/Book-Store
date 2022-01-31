import User from '../models/user.model';
import otp from '../models/otp';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodeMailer from './nodemailer';
dotenv.config();
//register user
export const registration = async (body) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(body.password, salt);
  body.password = hash;
  const data = await User.create(body);
  return data;
};

//login user
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  const token = jwt.sign({ email: body.email }, process.env.SECRET_KEY, {
    expiresIn: '100H'
  });
  const validatePassword = await bcrypt.compare(body.password, data.password);
  if (validatePassword) {
    return token;
  } else {
    throw new Error('Invalid user');
  }
};

//forgot password
export const forgotPassword = async (body) => {
  try {
    const data = await User.findOne({ email: body.email });
    if (!data) {
      return 'Email does not exist';
    } else {
      nodeMailer.sendEmail(body);
      return 'Email sent successfully';
    }
  } catch (err) {
    return err;
  }
};

//reset password
export const resetPassword = async (body) => {
  try {
    const data = await otp.findOne({ email: body.email, code: body.code });
    if (data) {
      const salt = await bcrypt.genSalt(12);
      body.password = await bcrypt.hash(body.password, salt);
      const resetedPassword = await User.updateOne({ email: body.email }, { $set: { password: body.password } });
      console.log(resetedPassword);
      if (!resetedPassword) {
        return 'Could Not Reset Password';
      } else {
        return resetedPassword;
      }
    } else {
      return 'Check The Code Entered';
    }
  } catch (error) {
    return error;
  }
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
