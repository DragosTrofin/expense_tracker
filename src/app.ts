import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/supabase.js';
import authRoutes from './routes/auth.routes.js';
import {authenticateToken} from './middleware/auth.middleware.js';
import expenseRoutes from './routes/expense.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Expense Tracker API is running' });
});
app.get('/', (req,res) => {
    res.json({status: 'OK', message: 'Welcome the the expense-tracker-API'});
});


app.get('/test-db', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    
    if (error) {
      return res.status(500).json({ status: 'DB_ERROR', error: error.message });
    }

    return res.json({ 
      status: 'SUCCESS', 
      message: 'Connected succesfully to the database', 
      data: data 
    });
  } catch (err) {
    return res.status(500).json({ status: 'SERVER_ERROR', error: 'Eroare' });
  }
});

app.use('/auth', authRoutes);


app.use('/expenses', expenseRoutes);

export default app;