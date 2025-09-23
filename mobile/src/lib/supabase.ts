import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: async (key: string) => {
        const { getItem } = await import('@react-native-async-storage/async-storage');
        return await getItem(key);
      },
      setItem: async (key: string, value: string) => {
        const { setItem } = await import('@react-native-async-storage/async-storage');
        await setItem(key, value);
      },
      removeItem: async (key: string) => {
        const { removeItem } = await import('@react-native-async-storage/async-storage');
        await removeItem(key);
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});