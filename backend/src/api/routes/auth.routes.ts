import authJwt from '../middleware/auth.middleware';
import upload from '../../helpers/multer';
import validateUser from '../middleware/validateUser.middleware';

import * as authController from '../controllers/auth.controllers';

import Router from 'express';

const router = Router();

router.post('/check_duplicate_email', authController.checkDuplicateEmail);

router.post('/signup', [upload.single('avatar'), validateUser.checkSignup], authController.signup);

router.post('/signin', authController.signin);

router.post('/refresh_token', [authJwt.verifyRefreshToken], authController.refreshToken);

router.patch('/change_password', [authJwt.verifyToken], authController.changePassword);

router.patch(
    '/change_info_user',
    [upload.single('avatar'), authJwt.verifyToken, validateUser.checkChangeInfo],
    authController.changeInfoUser,
);

router.post('/forgot_password', validateUser.checkExistEmail, authController.forgotPassword);

router.post('/reset_password', [authJwt.verifyToken], authController.resetPassword);

export default router;
