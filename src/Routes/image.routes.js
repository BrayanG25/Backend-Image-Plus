import { Router } from 'express';
import { searchImagesByKeywords, likeImage, unlikeImage, getUserFavoriteImages, likeImages } from '../Controllers/image.controller.js';
import { authRequired, authRequiredGET } from '../Middlewares/validateToken.middleware.js';

const router = Router();

// Get images by keyword(s)
router.get('/', searchImagesByKeywords);

// Like an image and register it if not exists
router.post('/like', authRequired, likeImage);

// Like an image and register it if not exists
router.post('/likes', authRequired, likeImages);

// Unlike an image
router.post('/unlike', authRequired, unlikeImage);

// Get favorite images by user ID
router.get('/user/favorites', authRequiredGET, getUserFavoriteImages);

export default router;