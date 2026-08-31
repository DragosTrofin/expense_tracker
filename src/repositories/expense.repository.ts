import { supabase } from '../config/supabase.js';

export const createExpenseInDB = async (
  userId: string,
  note: string,
  amount: number,
  category: string,
  date: string
) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([
      { 
        user_id: userId, 
        note: note, 
        amount: amount, 
        category: category, 
        date: date 
      }
    ])
    .select('*')
    .single(); 

  if (error) {
    throw new Error(`Eroare la salvarea cheltuielii: ${error.message}`);
  }

  return data;
};

export const getExpensesfromDB = async (userId: string) => {
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
    if(error)
    {
        throw new Error(`Eroare la preluarea cheltuielilor: ${error.message}`);
    }
    return data;
};


export const updateExpenseInDB = async (
  userId: string,
  expenseId: string,
  amount: number,
  category: string,
  date: string,
  note: string
) => {

  const result = await supabase
    .from('expenses')
    .update({ amount: amount, category: category, date: date, note: note })
    .eq('id', expenseId)
    .eq('user_id', userId) 
    .select('*');


  if (result.error) {
    throw new Error(`Eroare la actualizarea cheltuielii: ${result.error.message}`);
  }

  if (!result.data || result.data.length === 0) {
    throw new Error('Cheltuiala nu a fost gasita sau nu ai permisiunea sa o modifici.');
  }

  return result.data[0];
};

export const deleteExpenseInDB = async (userId: string, expenseId: string) => {
  const result = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId)
    .eq('user_id', userId) 
    .select('*');

  if (result.error) {
    throw new Error(`Eroare la stergerea cheltuielii: ${result.error.message}`);
  }

  if (!result.data || result.data.length === 0) {
    throw new Error('Cheltuiala nu a fost gasita sau nu ai permisiunea sa o stergi.');
  }

  return true;
}