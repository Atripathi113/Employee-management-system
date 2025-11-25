import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment ,getDepartments,getDepartment,deleteDepartment, updateDepartment} from '../controllers/departmentController.js';
import { get } from 'mongoose';
import e from 'express';

const router = express.Router();    
 router.get('/', authMiddleware, getDepartments);
router.post('/add', authMiddleware, addDepartment);
router.get('/:id', authMiddleware, getDepartment);
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);
 export default router;