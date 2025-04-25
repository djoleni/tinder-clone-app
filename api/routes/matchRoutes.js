import express from 'express'
import {protectRoute} from '../middleware/protectRoute.js'
import { swipeLeft, swipeRight, getMatches, getUserProfiles } from '../controller/matchController.js';

const router = express.Router();

router.post('/swipe-right/:likedUserId', protectRoute, swipeRight);
router.post('/swipe-left/:dislikedUserId', protectRoute, swipeLeft);

router.get('/', protectRoute, getMatches);
router.get('/user-profiles', protectRoute, getUserProfiles); //za swipeing

export default router;