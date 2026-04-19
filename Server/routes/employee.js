import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addEmployee,upload,getEmployees,getEmployee, updateEmployee, fetchEmployeesByDeptId} from '../controllers/departmentController.js';

const router = express.Router(); 

 router.get('/', authMiddleware, getEmployees);
router.post('/add', authMiddleware,upload.single('profileImage'), addEmployee);
router.get('/:id', authMiddleware, getEmployee);
router.put('/:id', authMiddleware, updateEmployee);
router.get('/:id', authMiddleware, fetchEmployeesByDeptId);
 export default router;