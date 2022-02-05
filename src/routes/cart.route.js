/* eslint-disable prettier/prettier */
import express from 'express';
import * as cartController from '../controllers/cart.controller';
import {userAuth} from '../middlewares/auth.middleware'

const cartRouter = express.Router();

//route to add book to cart
cartRouter.post('/:_id', userAuth, cartController.addToCart);

export default cartRouter;