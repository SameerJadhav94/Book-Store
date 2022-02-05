/* eslint-disable prettier/prettier */
import express from 'express';
import * as bookController from '../controllers/book.controller'
import { newBookValidator } from '../validators/bookValidator';
import {userAuth, userRole} from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload';

const bookRouter = express.Router();
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

export default bookRouter;