import express from 'express';
import {
  getEntryById,
  addPost,
  changeEntry,
  deleteEntry,
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
    body('note').trim(),
    validationErrorHandler,
    addPost
  );

postRouter.route('/:id')
  .get(authenticateToken, getEntryById)
  .put(authenticateToken,
    body('mood').trim().isLength({min: 2, max: 20}).isAlphanumeric(),
    body('entry_date').trim().isDate(),
    body('weight').trim().isNumeric({min: 15, max: 150}),
    body('sleep_hours').trim().isNumeric({min: 0, max: 24}),
    body('notes').trim().escape().custom((value, {req}) => {
      console.log('custom validator', value);
      return !(req.body.mood === value);
    }),
    validationErrorHandler,
    changeEntry)
  .delete(authenticateToken, deleteEntry);

export default postRouter;