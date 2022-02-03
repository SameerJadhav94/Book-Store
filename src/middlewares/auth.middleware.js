/* eslint-disable eqeqeq */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { user } = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const setRole = (role) => {
  return async (req, res, next) => {
    req.body.role = role;
    next();
  };
};

export const userRole = (req, res, next) => {
  let bearerToken = req.header('Authorization');
  bearerToken = bearerToken.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.SECRET_KEY);
  console.log(user);
  const role = user.role;
  if (role === 'admin') {
    next();
  } else {
    return res.send({
      message: 'You are not authorized to make this request'
    });
  }
};
