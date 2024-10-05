import express from 'express';
import { signUp, login  } from '../controllers/authController.js';

const authRouter = express.Router();

// Endpoint đăng ký
authRouter.post('/signup', signUp);
// Endpoint đăng nhập
authRouter.post('/login', login);

export default authRouter;