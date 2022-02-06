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
