import type { AppProps } from 'next/app';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

function requireEnv(name: string) {
  if (typeof process !== 'undefined' && process.env && !process.env[name]) {
    // Log once during build/SSR to help diagnose missing Vercel envs.
    // Do NOT throw here; we still provide values below to avoid build-time crash.
    console.warn(`[env] Missing ${name} at build/runtime`);
  }
}

export default function App({ Component, pageProps }: AppProps) {
  // Ensure these exist in build/runtime environments (Vercel CI pulls them to .env.local)
  requireEnv('NEXT_PUBLIC_SUPABASE_URL');
  requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  // Avoid creating on import; create at render so SSR sees env when present
  const supabaseClient = createPagesBrowserClient({
    supabaseUrl:
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://heaztitsbnotkozmhubw.supabase.co',
    supabaseKey:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'DUMMY_KEY_REPLACED_BY_VERCEL_ENV'
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialSession = (pageProps as any)?.initialSession;

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
