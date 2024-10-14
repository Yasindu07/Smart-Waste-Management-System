import express from 'express';
import { addDevice, getDevices } from '../controllers/device.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add-device',verifyToken, addDevice);
router.get('/get-user-devices',verifyToken, getDevices);

export default router;