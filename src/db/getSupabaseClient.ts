import { SupabaseClient, createClient } from '@supabase/supabase-js'

export const getSupabaseClient = (): SupabaseClient => {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE as string
  )
  return client
}
