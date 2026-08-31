import { type Response } from 'express';
import { type AuthRequest } from '../middleware/auth.middleware.js';
import { addExpense, getExpenses, editExpense, removeExpense, getExpenseSummary } from '../services/expense.service.js';
import {supabase} from '../config/supabase.js';

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'ID-ul utilizatorului lipseste din token.' });
    }

    const { note, amount, category, date } = req.body;

    const expense = await addExpense(userId, note, amount, category, date);
    
    return res.status(201).json({
      message: 'Cheltuiala adaugata cu succes',
      expense: expense
    });

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getUserExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'ID-ul utilizatorului lipseste din token.' });
    }

    const expenses = await getExpenses(userId);

    return res.status(200).json({
      message: 'Cheltuielile au fost preluate cu succes',
      count: expenses.length,
      expenses: expenses
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const expenseId = (typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0])?.trim();


    if (!userId) return res.status(401).json({ error: 'Neautorizat' });
    if (typeof expenseId !== 'string') {
      return res.status(400).json({ error: 'ID-ul cheltuielii este invalid.' });
    }

    const { amount, category, date, note } = req.body;

    if (!amount || !category || !date || !note) {
      return res.status(400).json({ error: 'Toate campurile sunt obligatorii.' });
    }

    const updated = await editExpense(userId, expenseId, amount, category, date, note);

    return res.status(200).json({
      message: 'Cheltuiala actualizata cu succes!',
      expense: updated
    });

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const expenseId = (typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0])?.trim();
    
    if (!userId) return res.status(401).json({ error: 'Neautorizat' }); 
    if(!expenseId) return res.status(400).json({ error: 'ID-ul cheltuielii este invalid.' });

    const result = await removeExpense(userId, expenseId);

    return res.status(200).json({
      message: result.message
    });

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const uploadReceipt = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const expenseId = (typeof req.params.id === 'string' ? req.params.id : req.params.id?.[0])?.trim();
    const file = req.file;

    if (!userId) return res.status(401).json({ error: 'Neautorizat' });
    if (!expenseId) return res.status(400).json({ error: 'ID-ul cheltuielii este invalid.' });
    if (!file) return res.status(400).json({ error: 'Nu a fost selectata nicio imagine.' });

    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${userId}_${expenseId}.${fileExtension}`;

    const{error: uploadError} = await supabase.storage
      .from('receipts')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true //permite suprascrierea fisierului
      });
      if(uploadError) {
        throw new Error(`Eroare la incarcarea imaginii: ${uploadError.message}`);
      }

    const { data: publicUrlData } = supabase.storage
      .from('receipts')
      .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      const { error:DBError } = await supabase
        .from('expenses')
        .update({ receipt_url: publicUrl })
        .eq('id', expenseId)
        .eq('user_id', userId);

      if(DBError) {
        throw new Error(`fisierul s-a incarcat, dar link-ul nu s-a salvat in DB: ${DBError.message}`);
      }

      return res.status(200).json({
        message: 'Bon incarcat cu succes!',
        receiptUrl: publicUrl
      });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};  

export const getSummary = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Neautorizat' });

    const summary = await getExpenseSummary(userId);

    return res.status(200).json(summary);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
