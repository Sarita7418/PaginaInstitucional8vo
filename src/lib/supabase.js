import { createClient } from '@supabase/supabase-js';

// Intentamos leer del .env, si no, usamos el texto directo (Hardcoded)
const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://bimfxpcxnltubnpzqirs.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || 'sb_publishable_6oELE6LopjsUI7-_JR2CoA_vwBpodUN';

if (!supabaseUrl || supabaseUrl === 'undefined') {
  console.error("Error: SUPABASE_URL no está definida en el archivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);