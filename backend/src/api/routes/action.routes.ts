import validateReview from '../middleware/validateAction.middleware';
import * as actionController from '../controllers/action.controllers';

import Router from 'express';
const router = Router();

router.post(
    '/review/add_review',
    [validateReview.checkExistReview, validateReview.checkAddReview],
    actionController.addReview,
);

router.get('/review/getall', actionController.getAllReview);

router.post('/like/add', validateReview.checkLikeBookExist, actionController.likeBook);

router.post('/review/add_like', validateReview.checkLikeReviewExist, actionController.likeReview);

router.post('/review/add_hide', validateReview.checkHideReviewExist, actionController.hideReview);

router.delete('/review/delete', validateReview.checkHideReviewExist, actionController.hideReview);

// router.get('/like/getall', actionController.getAllReview);

export default router;
