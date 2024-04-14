// routes/userRoutes.js
import express from 'express';
import { createUser, getAllUsers, loginUser, getUserById, swipeRight, swipeLeft, getUsersInChat } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';


const userRouter = express.Router();

userRouter.route('/user').post(createUser);
userRouter.route('/getAllUsers').get(authenticateToken, getAllUsers);
userRouter.route('/loginUser').post( loginUser);
userRouter.route('/getAllUsers/:uid').get(authenticateToken, getUserById);
userRouter.route('/swipeRight/:uid').post(authenticateToken, swipeRight);
userRouter.route('/swipeLeft/:uid').post(authenticateToken, swipeLeft);
userRouter.route('/getUsersInChat/:uid').get(authenticateToken, getUsersInChat);


export default userRouter;
