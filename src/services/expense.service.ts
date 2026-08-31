import { createExpenseInDB, getExpensesfromDB, updateExpenseInDB, deleteExpenseInDB } from '../repositories/expense.repository.js';

export const addExpense = async (
  userId: string,
  note: string,
  amount: number,
  category: string,
  date: string
) => {
  if (amount <= 0) {
    throw new Error('Suma cheltuita > 0.');
  }

  const newExpense = await createExpenseInDB(userId, note, amount, category, date);
  
  return newExpense;
};

export const getExpenses = async (userId: string) => {
  const expenses = await getExpensesfromDB(userId);
  
  return expenses;
};

export const editExpense = async (
  userId: string,
  expenseId: string,
  amount: number,
  category: string,
  date: string,
  note: string
) => {

  const updatedExpense = await updateExpenseInDB(userId, expenseId, amount, category, date, note);
  
  return updatedExpense;
}; 

export const removeExpense = async (userId: string, expenseId: string) => {
    await deleteExpenseInDB(userId, expenseId);
    return { message: 'Cheltuiala a fost stearsa cu succes.' };
};

export const getExpenseSummary = async (userId: string) => {
  const expenses = await getExpensesfromDB(userId);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryBreakdown = expenses.reduce((acc: Record<string, number>, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  return {
    total_transactions: expenses.length,
    total_amount: totalAmount,
    by_category: categoryBreakdown
  };
};