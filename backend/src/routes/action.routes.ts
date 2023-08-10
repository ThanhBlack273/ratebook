import validateReview from '../middleware/validateAction.middleware';
import authJwt from '../middleware/auth.middleware';
import * as actionController from '../controllers/action.controllers';

import Router from 'express';
const router = Router();

router.post(
    '/review/add_review',
    [authJwt.verifyToken, validateReview.checkExistReview, validateReview.checkValidReview],
    actionController.addReview,
);

router.patch(
    '/review/:reviewId',
    [authJwt.verifyToken, validateReview.checkOwnerReview, validateReview.checkUpdateReview],
    actionController.updateReview,
);

router.get('/review/getall',authJwt.verifyToken, actionController.getAllReview);

router.post('/like/:bookId/add', [authJwt.verifyToken, validateReview.checkLikeBookExist], actionController.likeBook);

router.post(
    '/review/:reviewId/add_like',
    [authJwt.verifyToken, validateReview.checkLikeReviewExist],
    actionController.likeReview,
);

router.post(
    '/review/:reviewId/add_hide',
    [authJwt.verifyToken, validateReview.checkHideReviewExist],
    actionController.hideReview,
);

router.delete(
    '/review/:reviewId/delete',
    [authJwt.verifyToken, validateReview.checkDeleteOwnerReview],
    actionController.deleteReview,
);

// router.get('/like/getall', actionController.getAllReview);

export default router;
