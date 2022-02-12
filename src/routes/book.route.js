/* eslint-disable prettier/prettier */
import express from 'express';
import * as bookController from '../controllers/book.controller'
import { newBookValidator } from '../validators/bookValidator';
import {userAuth, userRole} from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload';

export const bookRouter = express.Router();
//route to add book
bookRouter.post('/', userAuth, userRole, upload.single('image'), newBookValidator, bookController.addBook);

//route to get book
bookRouter.get('/', userAuth, bookController.getBook);

//route to get book by id
bookRouter.get('/:_id', userAuth, bookController.getBookById);

//route to update book by id
bookRouter.put('/:_id', userAuth, userRole, upload.single('image'), newBookValidator, bookController.updateBookById);

//route to delete book by id
bookRouter.delete('/:_id', userAuth, userRole, bookController.deleteBookById);

//route to sort books in ascending order
export const ascendingOrderRouter = express.Router();
ascendingOrderRouter.get('/', userAuth, bookController.ascendingOrder);

//route to sort books in descending order
export const descendingOrderRouter = express.Router();
descendingOrderRouter.get('/', userAuth, bookController.descendingOrder);

//route to sort books in alphabetical order by title
export const alphabeticalOrderRouter = express.Router();
alphabeticalOrderRouter.get('/', userAuth, bookController.alphabeticalOrder);

//route to sort books as per price from low to high
export const bookPriceAscendSortRouter = express.Router();
bookPriceAscendSortRouter.get('/', userAuth, bookController.priceLowToHighSort);

//route to sort books as per price from high to low
export const bookPriceDescendSortRouter = express.Router();
bookPriceDescendSortRouter.get('/', userAuth, bookController.priceHighToLowSort);