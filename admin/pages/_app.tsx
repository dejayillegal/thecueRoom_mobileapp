import type { AppProps } from 'next/app';
import { SessionContextProvider, createBrowserSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import '../styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
