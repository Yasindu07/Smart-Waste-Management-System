import express from 'express';
import { addDevice, getAllDevices, getDevices } from '../controllers/device.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add-device',verifyToken, addDevice);
router.get('/get-user-devices',verifyToken, getDevices);
router.get('/get-all-devices',verifyToken, getAllDevices);

export default router;