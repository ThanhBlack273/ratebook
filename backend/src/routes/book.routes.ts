import validateBook from '../middleware/validateBook.middleware';
import * as bookController from '../controllers/book.controller';
import authJwt from '../middleware/auth.middleware';

import Router from 'express';
const router = Router();

router.get('/check_exist', validateBook.checkExistBook);

router.post('/subscribe_book', [authJwt.verifyToken, validateBook.checkSubBook], bookController.subBook);

router.get('/get_all_book', bookController.getAllBook);

router.get('/search_book', bookController.searchBook);

router.get('/:id', authJwt.verifyToken, bookController.getBookById);

router.get('/:bookId/get_review_list', authJwt.verifyToken, bookController.getReviewList);

export default router;
