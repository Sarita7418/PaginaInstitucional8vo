export const prerender = true;// <--- ESTO ES LA CLAVE

import { createClient } from '@supabase/supabase-js';

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, personaData } = body;

    // Instanciamos Supabase con la LLAVE SECRETA (Service Role)
    const supabaseAdmin = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Crear el usuario en Auth de forma silenciosa (SIN iniciar sesión)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true // Confirmar automáticamente
    });

    if (authError) throw new Error(authError.message);

    // 2. Guardar los datos en public.personas asociando el UUID generado
    const nuevaPersona = {
      ...personaData,
      id_usuario: authData.user.id
    };

    const { error: dbError } = await supabaseAdmin.from('personas').insert([nuevaPersona]);
    if (dbError) throw new Error(dbError.message);

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
};