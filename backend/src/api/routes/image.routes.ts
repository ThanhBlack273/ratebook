import upload from '../../helpers/multer';
import validLinkImage from '../middleware/image.middleware';

import * as imageController from '../controllers/image.controller';

import Router from 'express';

const router = Router();

router.post('/up_image', upload.single('image'), imageController.upImage);

router.post('/del_image', validLinkImage.validLinkImage, imageController.delImage); //làm middleware kiểm tra link cloudinary

export default router;
