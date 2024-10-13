import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addCollector, getCollectors } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/addcollector',verifyToken, addCollector);
router.get('/getcollectors',verifyToken, getCollectors);

export default router;