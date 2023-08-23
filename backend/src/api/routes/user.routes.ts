// import authJwt from '../middleware/auth.middleware';
import * as userController from '../controllers/user/user.controller';
import Router from 'express';

const router = Router();

// router.get('/all', userController);
router.get('/get_user_info', /*[authJwt.verifyToken],*/ userController.getUserById);

router.get('/get_list_reviewed' /*, [authJwt.verifyToken]*/, userController.getReviewList);

router.get('/get_list_sub' /*, [authJwt.verifyToken]*/, userController.getBookSub);

router.get('/get_list_liked' /*, [authJwt.verifyToken]*/, userController.getLikedList);

export default router;
