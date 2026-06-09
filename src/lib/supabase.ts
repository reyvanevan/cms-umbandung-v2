import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Keys for localStorage
const URL_STORAGE_KEY = 'cms_supabase_url';
const KEY_STORAGE_KEY = 'cms_supabase_anon_key';

let activeClient: SupabaseClient | null = null;

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  source: 'env' | 'localStorage' | 'none';
}

/**
 * Get active Supabase credentials (from environment variables or localStorage fallback)
 */
export function getCredentials(): SupabaseConfig {
  // Try env vars first
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  
  if (envUrl && envKey && !envUrl.includes('your-project-ref')) {
    return {
      url: envUrl,
      anonKey: envKey,
      source: 'env'
    };
  }

  // Try localStorage next
  const localUrl = localStorage.getItem(URL_STORAGE_KEY) || '';
  const localKey = localStorage.getItem(KEY_STORAGE_KEY) || '';

  if (localUrl && localKey) {
    return {
      url: localUrl,
      anonKey: localKey,
      source: 'localStorage'
    };
  }

  return {
    url: '',
    anonKey: '',
    source: 'none'
  };
}

/**
 * Get or initialize the Supabase client
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (activeClient) {
    return activeClient;
  }

  const { url, anonKey } = getCredentials();
  
  if (!url || !anonKey) {
    return null;
  }

  try {
    activeClient = createClient(url, anonKey);
    return activeClient;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
}

/**
 * Save credentials to localStorage and clear the cached client instance
 */
export function saveCredentials(url: string, anonKey: string): void {
  if (!url || !anonKey) {
    localStorage.removeItem(URL_STORAGE_KEY);
    localStorage.removeItem(KEY_STORAGE_KEY);
  } else {
    localStorage.setItem(URL_STORAGE_KEY, url.trim());
    localStorage.setItem(KEY_STORAGE_KEY, anonKey.trim());
  }
  // Reset active client to force re-initialization
  activeClient = null;
}

/**
 * Clear credentials from localStorage
 */
export function clearCredentials(): void {
  localStorage.removeItem(URL_STORAGE_KEY);
  localStorage.removeItem(KEY_STORAGE_KEY);
  activeClient = null;
}

/**
 * Test connection to Supabase
 */
export async function testConnection(): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase client is not configured.' };
  }

  try {
    // Attempt a simple ping - fetching the auth session or a quick schema check
    const { error } = await client.auth.getSession();
    if (error) {
      return { success: false, message: `Supabase returned an error: ${error.message}` };
    }
    return { success: true, message: 'Successfully connected to Supabase!' };
  } catch (error: any) {
    return { success: false, message: `Network error: ${error?.message || 'Unknown error'}` };
  }
}
