import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addCollector, completeProfile, getUsersByRole } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/addcollector',verifyToken, addCollector);
router.get('/getusers',verifyToken, getUsersByRole);
router.put('/completeprofile/:userId',verifyToken, completeProfile);

export default router;