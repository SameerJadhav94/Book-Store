/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const addToCart = async (req, res, next) => {
  try {
    const cartData = {
        userId: req.user._id,
        bookId: req.params._id,
        quantity: req.body.quantity
    }
    const data = await CartService.addToCart(cartData);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data
    });
  } catch (error) {
    next(error);
  }
};

export const removeBookFromCart = async (req, res, next) => {
  try {
    const bookData = {
      userId: req.user._id,
      title: req.body.title,
      quantity: req.body.quantity
    }
    const data = await CartService.removeBookFromCart(bookData);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Book has been removed from cart.`
    });
  } catch (err) {
    next(err);
  }
};