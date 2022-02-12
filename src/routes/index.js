import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import {
  bookRouter,
  ascendingOrderRouter,
  descendingOrderRouter,
  alphabeticalOrderRouter,
  bookPriceAscendSortRouter,
  bookPriceDescendSortRouter
} from './book.route';
import cartRoute from './cart.route';
import searchRoute from './search.route';
import wishlistRoute from './wishlist.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/book', bookRouter);
  router.use('/ascending', ascendingOrderRouter);
  router.use('/descending', descendingOrderRouter);
  router.use('/alphabetical', alphabeticalOrderRouter);
  router.use('/priceLowToHigh', bookPriceAscendSortRouter);
  router.use('/priceHighToLow', bookPriceDescendSortRouter);
  router.use('/cart', cartRoute);
  router.use('/search', searchRoute);
  router.use('/wishlist', wishlistRoute);

  return router;
};

export default routes;
