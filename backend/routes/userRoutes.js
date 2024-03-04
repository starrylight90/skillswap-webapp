// routes/userRoutes.js
import express from 'express';
import { createUser, getAllUsers, loginUser } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';


const userRouter = express.Router();

userRouter.route('/user').post(createUser);
userRouter.route('/getAllUsers').get(authenticateToken, getAllUsers);
userRouter.route('/loginUser').post( loginUser);

export default userRouter;
