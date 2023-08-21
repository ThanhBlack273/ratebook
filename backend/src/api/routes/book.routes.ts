import validateBook from '../middleware/validateBook.middleware';
import * as bookController from '../controllers/book.controller';

import Router from 'express';
import authJwt from '../middleware/auth.middleware';
const router = Router();

router.get('/check_exist', validateBook.checkExistBook);

router.get('/get_all_book', bookController.getAllBook);

router.get('/search_book', bookController.searchBook);

router.use(authJwt.verifyToken);

router.post('/subscribe_book', validateBook.checkSubBook, bookController.subBook);

router.get('/:id', bookController.getBookById);

router.get('/:bookId/get_review_list', bookController.getReviewList);

export default router;
