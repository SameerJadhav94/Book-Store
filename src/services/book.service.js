/* eslint-disable prettier/prettier */
import Book from '../models/book.model';

export const addBook = async (body) => {
  const data = Book.create(body);
  return data;
};

export const getBook = async () => {
  const data = Book.find()
  return data;
};
