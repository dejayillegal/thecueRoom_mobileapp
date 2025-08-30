import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { adminClient } from '../utils/client.ts';

const ALLOWLIST = new Set<string>([
  // insert your admin user IDs here
]);

serve(async (req) => {
  try {
    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: uerr,
    } = await adminClient.auth.getUser(token);
    if (uerr || !user || !ALLOWLIST.has(user.id)) {
      return new Response('Forbidden', { status: 403 });
    }

    const { uid, role } = await req.json();
    const { error } = await adminClient.auth.admin.updateUserById(uid, {
      app_metadata: { role },
    });
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400 });
  }
});
