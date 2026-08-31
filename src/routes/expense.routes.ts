import {Router} from 'express';
import {createExpense, getUserExpenses, updateExpense, deleteExpense, uploadReceipt, getSummary} from '../controllers/expense.controller.js';
import {authenticateToken, } from '../middleware/auth.middleware.js'; 
import {upload} from '../middleware/upload.middleware.js';
import {validateData} from '../middleware/validate.middleware.js';
import {expenseSchema} from '../schemas/expense.schema.js';



const router = Router();

router.use(authenticateToken);

router.post('/', validateData(expenseSchema), createExpense);
router.get('/', getUserExpenses);
router.put('/:id', validateData(expenseSchema), updateExpense);
router.delete('/:id', deleteExpense);
router.post('/:id/receipt', upload.single('receipt'), uploadReceipt);
router.get('/summary', getSummary);

export default router;