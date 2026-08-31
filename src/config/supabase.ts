import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseURL = process.env.SUPABASE_URL || ``;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ``;

if( !supabaseKey || !supabaseURL)
{
    throw new Error("missing supabase environment variables in .env");
}
const supabase = createClient(supabaseURL, supabaseKey);
export { supabase };