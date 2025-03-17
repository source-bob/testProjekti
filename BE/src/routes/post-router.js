import express from 'express';
import {
  getPostsById,
  addPost,
  changePost,
  deletePost,
  getPosts,
} from '../controllers/post-controller.js';
import {body} from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handler.js'

const postRouter = express.Router();

postRouter.route('/')
  .get(authenticateToken, getPosts)
  .post(
    authenticateToken,
    body('user_id').trim().isNumeric(),
    body('note').trim().isLength({min: 5, max: 150}),
    validationErrorHandler,
    addPost
  );

postRouter.route('/:id')
  .get(authenticateToken, getPostsById)
  .put(authenticateToken,
    body('note').trim().isLength({min: 5, max: 150}),
    validationErrorHandler,
    changePost)
  .delete(authenticateToken, deletePost);

export default postRouter;