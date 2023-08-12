import { SupabaseClient, createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getSupabaseServerSide = (): SupabaseClient => {
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE as string
  )
  return client
}

export const getSupabaseClietSide = (): SupabaseClient => {
  const supabase = createClientComponentClient<Database>()
  return supabase
}
