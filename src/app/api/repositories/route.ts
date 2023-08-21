import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data } = await supabase.auth.getUser()

  const { data: repos, error } = await supabase
    .from('Projects')
    .select()
    .eq('user', data.user?.user_metadata.user_name)

  if (error) {
    return new Response(null, {
      status: Number(error.code),
    })
  }

  return new Response(JSON.stringify(repos), {
    status: 200,
  })
}
