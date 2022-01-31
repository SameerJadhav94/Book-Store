import express from 'express';
import * as userController from '../controllers/user.controller';
import * as bookController from '../controllers/book.controller';
import { newUserValidator, loginValidator, emailValidator, resetPasswordValidator } from '../validators/user.validator';
import { newBookValidator } from '../validators/bookValidator';
import { userAuth, setRole } from '../middlewares/auth.middleware';

const router = express.Router();

//routes for user to register
router.post('/user', newUserValidator, setRole('user'), userController.register);

//routes for admin to register
router.post('/admin', newUserValidator, setRole('admin'), userController.register);

//route to login
router.post('/login', loginValidator, userController.login);

//route for forgot password
router.post('/forgotpassword', emailValidator, userController.forgotPassword);

//route to reset password
router.patch('/resetpassword', resetPasswordValidator, userController.resetPassword);

//route to add book
router.post('/book', userAuth, newBookValidator, bookController.addBook);

//route to add book
router.get('/book', userAuth, bookController.getBook);
export default router;
