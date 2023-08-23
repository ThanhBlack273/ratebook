import authJwt from '../middleware/auth.middleware';
import validateUser from '../middleware/validateUser.middleware';

import * as authController from '../controllers/auth.controllers';

import Router from 'express';

const router = Router();

router.post('/check_duplicate_email', authController.checkDuplicateEmail);

router.post('/signup', validateUser.checkSignup, authController.signup);

router.post('/signin', authController.signin);

router.post('/refresh_token', authJwt.verifyRefreshToken, authController.refreshToken);

router.post('/forgot_password', validateUser.checkExistEmail, authController.forgotPassword);

router.use(authJwt.verifyToken);

router.put('/logout', authController.logout);

router.patch('/change_password', validateUser.checkChangePass, authController.changePassword);

router.patch('/change_info_user', validateUser.checkChangeInfo, authController.changeInfoUser);

router.post('/reset_password', validateUser.checkResetPass, authController.resetPassword);

export default router;
