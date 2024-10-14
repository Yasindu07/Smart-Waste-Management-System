import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addUsers, completeProfile, deleteUser, getUsersByRole } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/addUsers',verifyToken, addUsers);
router.get('/getusers',verifyToken, getUsersByRole);
router.put('/completeprofile/:userId',verifyToken, completeProfile);
router.delete('/deleteuser/:userId',verifyToken, deleteUser);

export default router;