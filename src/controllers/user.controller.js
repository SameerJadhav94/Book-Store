import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to register users
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next
 */
export const register = async (req, res, next) => {
  try {
    const data = await UserService.registration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User was successfully registered.'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to login users
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} next
 */
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      token: data,
      message: 'User login successfully'
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller for forgot password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.OK).json({
      data: data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to reset password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Password reseted successfully'
    });
  } catch (error) {
    next(error);
  }
};
