import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Screen, H1, Input, Button, P } from '../components/Ui';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    if (!email || !password) return Alert.alert('Enter email and password');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Sign in failed', error.message);
  };

  const signUp = async () => {
    if (!email || !password) return Alert.alert('Enter email and password');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Sign up failed', error.message);
    else Alert.alert('Check your inbox to confirm your account, then sign in.');
  };

  return (
    <Screen>
      <H1>Sign in</H1>
      <Input autoCapitalize="none" keyboardType="email-address" placeholder="Email" value={email} onChangeText={setEmail} />
      <Input secureTextEntry placeholder="Password" value={password} onChangeText={setPassword} />
      <Button title="Sign in" onPress={signIn} />
      <Button title="Create account" variant="ghost" onPress={signUp} />
      <P style={{ marginTop: 8 }}>You can always continue as a guest from the landing screen.</P>
    </Screen>
  );
}
