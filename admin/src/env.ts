import { z } from 'zod';

const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(10)
});

export const env = (() => {
  const parsed = schema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });
  if (!parsed.success) {
    // Produce a helpful error during build/SSR if envs are missing
    // Do not swallow—this prevents silent misconfigurations in prod.
    console.error(parsed.error.format());
    throw new Error('Missing required Supabase envs for Admin (see .env.example and Vercel envs)');
  }
  return parsed.data;
})();
