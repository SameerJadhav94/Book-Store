import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, loginValidator, emailValidator, resetPasswordValidator } from '../validators/user.validator';
import { setRole } from '../middlewares/auth.middleware';

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

export default router;
