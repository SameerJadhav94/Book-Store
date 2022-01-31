/* eslint-disable prettier/prettier */
import Book from '../models/book.model';

//add book
export const addBook = async (body) => {
  const data = Book.create(body);
  return data;
};

//get book
export const getBook = async () => {
  const data = Book.find()
  return data;
};
