import express from 'express'
import { signup,login,logout} from '../controller/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', protectRoute, (req,res) => {
    res.send({
        success:true,
        user: req.user //dobijeno iz protectRoute middleware-a 
    })
});

export default router;