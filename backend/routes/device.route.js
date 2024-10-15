import express from 'express';
import { addDevice, getAllDevices, getDeviceByUserId, getDevices } from '../controllers/device.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add-device', addDevice);
router.get('/get-user-devices',verifyToken, getDevices);
router.get('/get-all-devices',verifyToken, getAllDevices);
router.get('/get-device-by-user/:userId',verifyToken, getDeviceByUserId);

export default router;