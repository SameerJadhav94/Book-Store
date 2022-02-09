/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as wishListService from '../services/wishlist.service';

export const addToWishlist = async (req, res, next) => {
    try {
        const wishList = {
            userId: req.user._id,
        }
      const data = await wishListService.addToWishlist(req.params._id, wishList);
      if (data==='Book Already Exist') {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `The Book is already in your wishlist`
        });
      }else{
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: `The book has Been added to wishlist!`
        });
      }
    } catch (err) {
      next(err);
    }
  };