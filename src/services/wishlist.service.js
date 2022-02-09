/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import WishList from '../models/wishlist.model';
import Book from '../models/book.model';

export const addToWishlist = async (id, List) => {
  try {
    const listCheck = await WishList.findOne();
    const bookData = await Book.findById(id);
    if (listCheck) {
      const book = {
        bookId: bookData._id,
        bookName: bookData.title,
        image: bookData.image,
        price: bookData.price
      };
      List.books = [...listCheck.books, book];
      let flag = false;
      for (let index = 0; index < listCheck.books.length; index++) {
        if (id===listCheck.books[index].bookId.toString()) {
          flag = true
        }
      }
      if (flag===true) {
        return 'Book Already Exist'
      }else{
        const data = await WishList.findByIdAndUpdate(listCheck._id, List, { new: true });
      return data;
      }
    } else {
      const book = {
        bookId: bookData._id,
        bookName: bookData.title,
        image: bookData.image,
        price: bookData.price
      };
      List.books = [book];
      const data = await WishList.create(List);
      console.log(data);
      return data;
    }
  } catch (error) {
    return 'Cannot add to wishlist';
  }
};
