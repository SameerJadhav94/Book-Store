/* eslint-disable prettier/prettier */
import express from 'express';
import {userAuth} from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller';

const wishlistRouter = express.Router();

wishlistRouter.post('/:_id', userAuth, wishlistController.addToWishlist)


export default wishlistRouter;
