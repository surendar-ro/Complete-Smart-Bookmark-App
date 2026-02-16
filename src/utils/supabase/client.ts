import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('YOUR_SUPABASE_URL')) {
    // In a real app we might want to return a dummy client or throw a specific error
    // For now, return a client that will fail gracefully? No, it will crash if args are bad.
    // If we are here, middleware should have redirected us. 
    // But client components might still run on /setup or if middleware logic is bypassed.

    // We can't really return a valid client without keys.
    // We'll throw a descriptive error that the UI can catch or just fail.
    // But since we are redirected to /setup, this shouldn't be called unless we are on /setup.
    throw new Error('Supabase credentials are missing. Please configure them in .env.local')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
