// routes/userRoutes.js
import express from 'express';
import { createUser, getUsers } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/user').post(createUser);
userRouter.route('/getUsers').get(getUsers);

export default userRouter;
