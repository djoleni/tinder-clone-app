import express from 'express'
import { sendMessage, getConversation } from '../controller/messageController.js';
import {protectRoute} from '../middleware/protectRoute.js'

const router = express.Router();

router.use(protectRoute);

router.post("/send", sendMessage);
router.get("/conversation/:userId", getConversation);


export default router;