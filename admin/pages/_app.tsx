import type { AppProps } from 'next/app';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { env } from '@/src/env';

export default function App({ Component, pageProps }: AppProps) {
  const supabaseClient = createPagesBrowserClient({
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialSession = (pageProps as any)?.initialSession;
  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
