import validateBook from '../middleware/validateBook.middleware';
import * as bookController from '../controllers/book.controller';

import Router from 'express';
const router = Router();

router.get('/check_exist', validateBook.checkExistBook);

router.post('/subscribe_book', validateBook.checkSubBook, bookController.subBook);

router.get('/get_all_book', bookController.getAllBook);

router.get('/search_book', bookController.searchBook);

router.get('/get_book_info', bookController.getBookById);

router.get('/get_review_list', bookController.getReviewList);

export default router;
