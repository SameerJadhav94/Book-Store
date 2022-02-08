/* eslint-disable prettier/prettier */
import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const searchRouter = express.Router();

searchRouter.get('/', userAuth, bookController.searchBook)

export default searchRouter;