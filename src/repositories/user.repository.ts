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

export const blacklistToken = async (token: string) => {
  const { error } = await supabase.from('blacklisted_tokens').insert([{ token }]);
if (error) {
    console.log('Motivul exact de la Supabase:', error); // Afișăm eroarea ascunsă
    throw new Error('Eroare la invalidarea token-ului.');
  }};

export const isTokenBlacklisted = async (token: string) => {
  const { data } = await supabase.from('blacklisted_tokens').select('token').eq('token', token).single();
  return !!data;
};