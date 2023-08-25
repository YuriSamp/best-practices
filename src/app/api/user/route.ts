import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { data } = await supabase.auth.getUser()

  const { data: logs } = await supabase
    .from('Logs')
    .select()
    .eq('user_id', data.user?.id)
  const { data: userTokens } = await supabase
    .from('Users')
    .select()
    .eq('user_uid', data.user?.id)

  const tokens_used =
    logs?.map((log) => log.token_count).reduce((a, b) => a + b) || 0

  const maxTokens = userTokens?.at(0)?.tokens || 0

  return new Response(JSON.stringify({ tokens_used, maxTokens }), {
    status: 200,
  })
}
