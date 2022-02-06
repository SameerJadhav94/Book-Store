/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const addToCart = async (cart) => {
  try {
    const bookData = await Book.findById({ _id: cart.bookId });
    if (bookData.quantity===0) {
      return `${bookData.title} is currently out of stock, please come back later.`
    }
    else if (cart.quantity > bookData.quantity) {
      return `Please select quantity less than ${bookData.quantity}.`;
    } else {
      const checkCart = await Cart.findOne();
      if (checkCart) {
        //Adding the quantity of the book
        checkCart.totalQuantity = checkCart.totalQuantity + cart.quantity;
        const finalQuantity = checkCart.totalQuantity;
        //Price of books for the quantity
        const bookPrice = cart.quantity * bookData.price;
        //Total Price of books in the cart
        let priceArray = checkCart.prices
        priceArray.push(bookPrice);
        let totalPrice = 0;
        for (let i = 0; i<= priceArray.length-1; i++){
          totalPrice = totalPrice + priceArray[i]
        }
        const finalPrice = totalPrice;
        //Object
        const data = {
          userId: cart.userId,
          bookId: [...checkCart.bookId,cart.bookId],
          bookName:[...checkCart.bookName, bookData.title],
          quantityPerBook:[...checkCart.quantityPerBook, cart.quantity],
          totalQuantity: finalQuantity,
          prices: [...checkCart.prices],
          total:finalPrice,
          isPurchased: false
        };
        //Mongoose query to update the cart
        const book = await Cart.findByIdAndUpdate({_id:checkCart._id}, data, {new: true});
        //Update The Book Quantity In The Inventory
        const updatedData = {
          author: bookData.author,
          title: bookData.title,
          image: bookData.image,
          quantity: (bookData.quantity-cart.quantity),
          price: bookData.price,
          description: bookData.description
        };
        await Book.findByIdAndUpdate(bookData._id, updatedData, {new: true});
        return book;
      } else {
        //Price of books for the quantity
        const bookPrice = cart.quantity * bookData.price;
        //Object
        const data = {
          userId: cart.userId,
          bookId: [cart.bookId],
          bookName:[bookData.title],
          quantityPerBook:[cart.quantity],
          totalQuantity:cart.quantity,
          prices: [bookPrice],
          total: bookPrice,
          isPurchased: false
        };
        //Mongoose query to create a cart if the cart is empty.
        const book = await Cart.create(data);
        //Update The Book Quantity In The Inventory
        const updatedData = {
          author: bookData.author,
          title: bookData.title,
          image: bookData.image,
          quantity: (bookData.quantity-cart.quantity),
          price: bookData.price,
          description: bookData.description
        };
        await Book.findByIdAndUpdate(bookData._id, updatedData, {new: true});
        return book;
      }
    }
  } catch (error) {
    throw new Error(`Cannot add the book to cart!`);
  }
};
