/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';
import Book from '../models/book.model';
import logger from '../config/logger';

// Controller for add book
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
export const addBook = async (req, res, next) => {
  try {
    const bookData = {
      author: req.body.author,
      title: req.body.title,
      image: req.file.path,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description
    };
    const data = await BookService.addBook(bookData);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: `The Book "${data.title}" has Been Added!`
    });
  } catch (err) {
    next(err);
  }
};

// Controller for get book
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
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

// Controller for get book by Id
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
export const getBookById = async (req, res, next) => {
  try {
    const data = await BookService.getBookById(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Book: "${data.title}".`
    });
  } catch (err) {
    next(err);
  }
};

// Controller for update book by Id
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
export const updateBookById = async (req, res, next) => {
  try {
    const bookData = {
      author: req.body.author,
      title: req.body.title,
      image: req.file.path,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description
    };
    const data = await BookService.updateBookById(req.params._id, bookData);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Book: "${data.title}" has been updated successfully.`
    });
  } catch (err) {
    next(err);
  }
};

// Controller for delete book by Id
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
export const deleteBookById = async (req, res, next) => {
  try {
    const data = await BookService.deleteBookById(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Book: "${data.title}" has been deleted successfully.`
    });
  } catch (err) {
    next(err);
  }
};

export const searchBook = async (req, res, next) => {
  try {
    const data = await BookService.searchBook(req.params.title);
    if (data==='Problem Occured') {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error occurred while searching for results.`
      });
    }else{
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: `Here are results matching your search...`
      });
    }
  } catch (err) {
    next(err);
  }
};

// Controller for sort book in ascending order
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
 export const ascendingOrder = async (req, res, next) => {
  try {
    const data = await BookService.ascendingOrder();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Books...`
    });
  } catch (err) {
    next(err);
  }
};

// Controller for sort book in descending order
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
 export const descendingOrder = async (req, res, next) => {
  try {
    const data = await BookService.descendingOrder();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Books...`
    });
  } catch (err) {
    next(err);
  }
};

// Controller for sort book in alphabetical order
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
 export const alphabeticalOrder = async (req, res, next) => {
  try {
    const data = await BookService.alphabeticalOrder();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Books...`
    });
  } catch (err) {
    next(err);
  }
};

// Controller for sort book as per price from low to high
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
 export const priceLowToHighSort = async (req, res, next) => {
  try {
    const data = await BookService.priceLowToHighSort();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Books...`
    });
  } catch (err) {
    next(err);
  }
};

// Controller for sort book as per price from high to low
/**
 *
 * @param {object} req request object
 * @param {object} res  response object
 * @param {object} next
 */
 export const priceHighToLowSort = async (req, res, next) => {
  try {
    const data = await BookService.priceHighToLowSort();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `Your Books...`
    });
  } catch (err) {
    next(err);
  }
};