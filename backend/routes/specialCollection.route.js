import express from 'express';
import { addSpecialCollection, getSpecialCollections, getSpecialCollectionsById, updateSpecialCollection, updateSpecialStatus, deleteSpecialCollection } from '../controllers/specialCollection.controller.js';

const router = express.Router();

router.post('/add', addSpecialCollection);
router.get('/get', getSpecialCollections);
router.get('/get/:id', getSpecialCollectionsById);
router.put('/update/:id', updateSpecialCollection);
router.put('/updateStatus/:id', updateSpecialStatus);
router.delete('/delete/:id', deleteSpecialCollection);

export default router;