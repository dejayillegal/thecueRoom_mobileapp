import type { AppProps } from 'next/app';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import '../styles.css';

export default function App({ Component, pageProps }: AppProps) {
  const supabaseClient = createPagesBrowserClient();
  // pageProps.initialSession is optional; guard safely
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={(pageProps as any)?.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
