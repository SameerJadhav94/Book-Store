import User from '../models/user.model';
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
  const validatePassword = bcrypt.compare(body.password, data.password);
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
      return nodeMailer.sendEmail(body);
    }
  } catch (err) {
    return err;
  }
};

//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
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
