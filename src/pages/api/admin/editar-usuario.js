export const prerender = false; // <--- AÑADIR ESTA LÍNEA AQUÍ TAMBIÉN

import { createClient } from '@supabase/supabase-js';

export const PUT = async ({ request }) => {
  try {
    const body = await request.json();
    const { id_persona, id_auth, nuevaClave, personaData } = body;

    const supabaseAdmin = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Si el administrador escribió una nueva contraseña, la actualizamos
    if (nuevaClave && nuevaClave.length >= 6 && id_auth) {
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id_auth, {
        password: nuevaClave
      });
      if (authError) throw new Error("Error al cambiar contraseña: " + authError.message);
    }

    // 2. Actualizar los datos públicos del perfil
    const { error: dbError } = await supabaseAdmin.from('personas').update(personaData).eq('id', id_persona);
    if (dbError) throw new Error(dbError.message);

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    // ESTA LÍNEA ES NUEVA: Imprimirá el error real en tu terminal de Astro
    console.error("🔥 ERROR EN BACKEND:", error.message); 
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
};