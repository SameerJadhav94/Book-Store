/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

export const addBook = async (req, res, next) => {
  try {
    const data = await BookService.addBook(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: `The Book "${data.title}" has Been Added!`
    });
  } catch (err) {
    next(err);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const data = await BookService.getBook();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Books...`
    });
  } catch (err) {
    next(err);
  }
};
