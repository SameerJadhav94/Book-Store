import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, loginValidator } from '../validators/user.validator';
import { userAuth, setRole } from '../middlewares/auth.middleware';

const router = express.Router();

//routes for user to register
router.post('/user', newUserValidator, setRole('user'), userController.register);

//routes for admin to register
router.post('/admin', newUserValidator, setRole('admin'), userController.register);

//route to login
router.post('/login', loginValidator, userController.login);

//route to get all users
router.post('/forgotpassword', userController.forgotPassword);

//route to create a new user
router.post('', newUserValidator, userController.newUser);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
