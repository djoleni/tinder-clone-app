import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { updateProfile } from '../controller/userController.js';

const router = express.Router();

router.put("/update", protectRoute, updateProfile);




export default router;