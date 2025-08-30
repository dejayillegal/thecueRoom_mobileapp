import 'react-native-url-polyfill/auto';
import {
  createClient,
  type SupabaseClientOptions,
} from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

type Storage = SupabaseClientOptions['auth']['storage'];

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: SecureStore as unknown as Storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
