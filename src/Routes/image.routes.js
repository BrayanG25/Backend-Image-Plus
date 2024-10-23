import { Router } from 'express';
import { searchImagesByKeywords, likeImage, unlikeImage, getUserFavoriteImages } from '../Controllers/image.controller.js';
import { authRequired } from '../Middlewares/validateToken.middleware.js';

const router = Router();

// Get images by keyword(s)
router.get('/', searchImagesByKeywords);

// Like an image and register it if not exists
router.post('/like', authRequired, likeImage);

// Unlike an image
router.post('/unlike', authRequired, unlikeImage);

// Get favorite images by user ID
router.get('/user/favorites', authRequired, getUserFavoriteImages);

export default router;