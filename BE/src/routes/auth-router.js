import express from 'express';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import { registerUser } from '../controllers/user-controller.js';
import { validationErrorHandler } from '../middlewares/error-handler.js';
import { body } from 'express-validator';

const authRouter = express.Router();

// post to /api/auth/login
authRouter.post('/login', login);
authRouter.get('/me', authenticateToken, getMe);

authRouter.post('/register',
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrorHandler,
    registerUser
);

export default authRouter;