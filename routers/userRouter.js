import express from 'express';
import { Createuser } from '../Controllers/userControl.js';
import { loginUser } from '../Controllers/userControl.js';
const userRouter = express.Router();

userRouter.post("/" , Createuser)
userRouter.post("/login" , loginUser)

export default userRouter;