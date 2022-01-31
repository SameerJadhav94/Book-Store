/* eslint-disable prettier/prettier */
import Book from '../models/book.model';

//add book
export const addBook = async (body) => {
  const data = await Book.create(body);
  return data;
};

//get book
export const getBook = async () => {
  const data = await Book.find().sort({ updatedAt: -1 })
  return data;
};

//get book by id
export const getBookById = async (id) => {
  const data = await Book.findById(id)
  return data;
};

//update book by id
export const updateBookById = async (id, body) => {
  const data = await Book.findByIdAndUpdate(id, body, {new: true});
  return data;
};

//delete book by id
export const deleteBookById = async (id) => {
  const data = await Book.findByIdAndDelete(id);
  return data;
};
