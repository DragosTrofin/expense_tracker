import { supabase } from '../config/supabase.js';


export const findUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email) 
    .single();

  // PGRST116 -> nu s a gasit niciun rand
  if (error && error.code !== 'PGRST116') {
    throw new Error(`Eroare la cautarea utilizatorului: ${error.message}`);
  }

  return data; 
};

export const createUser = async (email: string, passwordHash: string) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email: email, password_hash: passwordHash }])
    .select('id, email, created_at')
    .single();

  if (error) {
    throw new Error(`Eroare la crearea utilizatorului: ${error.message}`);
  }

  return data;
};