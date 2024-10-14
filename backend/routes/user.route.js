import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addCollector, completeProfile, getCollectors } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/addcollector',verifyToken, addCollector);
router.get('/getcollectors',verifyToken, getCollectors);
router.put('/completeprofile/:userId',verifyToken, completeProfile);

export default router;