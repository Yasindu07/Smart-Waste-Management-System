import express from 'express';
import { addTrucks, deleteTruck, getAllTrucks, getTruckById, updateTruck,getAllTruckNumbers } from '../controllers/truck.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/addtrucks',verifyToken, addTrucks);
router.get('/alltrucks',verifyToken, getAllTrucks);
router.get('/:id',verifyToken, getTruckById);
router.put('/updatetruck/:id',verifyToken, updateTruck);
router.delete('/deletetruck/:id',verifyToken, deleteTruck);
router.get('/', getAllTruckNumbers);



export default router;

