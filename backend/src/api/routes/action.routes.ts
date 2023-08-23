import validateReview from '../middleware/validateAction.middleware';
import authJwt from '../middleware/auth.middleware';
import * as actionController from '../controllers/action/action.controllers';

import Router from 'express';
const router = Router();

router.use(authJwt.verifyToken);

router.post(
    '/review/add_review',
    [validateReview.checkExistReview, validateReview.checkValidReview],
    actionController.addReview,
);

router.patch(
    '/review/:reviewId',
    [validateReview.checkOwnerReview, validateReview.checkUpdateReview],
    actionController.updateReview,
);

router.get('/review/getall', actionController.getAllReview);

router.post('/like/:bookId/add', [validateReview.checkLikeBookExist], actionController.likeBook);

router.post('/review/:reviewId/add_like', [validateReview.checkLikeReviewExist], actionController.likeReview);

router.post('/review/:reviewId/add_hide', [validateReview.checkHideReviewExist], actionController.hideReview);
router.delete('/review/:reviewId/delete', [validateReview.checkDeleteOwnerReview], actionController.deleteReview);

router.post('/notification/', actionController.addNoti);

router.get('/notification/', actionController.noti);

router.put('/notification/:id', actionController.seenNoti);

router.get('/notification/listUser/', actionController.findUserEmail);
// router.get('/like/getall', actionController.getAllReview);

export default router;
