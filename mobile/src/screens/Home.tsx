import React from 'react';
import { Screen, H1, P, Button } from '../components/Ui';
import { supabase } from '../lib/supabase';

export default function Home() {
  return (
    <Screen>
      <H1>Home</H1>
      <P>You're signed { (supabase.auth.getSession as any) ? 'in' : 'out' }.</P>
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </Screen>
  );
}
