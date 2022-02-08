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
    if (data==='Cart is empty.') {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Your Cart Does Not Have Any Books.'
      })
    }else if(data==='Invalid quantity.'){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Select Proper Quantity.'
      })
    }
    else if(data==='Cannot remove book from cart'){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problem occured while removing book from cart.'
      });
    }else{
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Book has been removed from cart.'
      });
    }
  } catch (err) {
    next(err);
  }
};