import React from 'react';
import { Screen, H1, P, Button } from '../components/Ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

export default function Landing({ navigation }: Props) {
  return (
    <Screen>
      <H1>Welcome to ThecueRoom</H1>
      <P>Stay on top of the latest news and manage your profile. Sign in to sync your experience.</P>
      <Button title="Get Started (Sign in)" onPress={() => navigation.navigate('Login')} />
      <Button title="Continue as Guest" variant="ghost" onPress={() => navigation.replace('Main')} />
    </Screen>
  );
}
