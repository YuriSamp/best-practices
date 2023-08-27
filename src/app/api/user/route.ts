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
  const { data: user } = await supabase
    .from('Users')
    .select()
    .eq('user_uid', data.user?.id)

  const tokensUsed =
    logs?.map((log) => log.token_count).reduce((a, b) => a + b) || 0

  const maxTokens = user?.at(0)?.tokens || 0

  return new Response(
    JSON.stringify({
      tokensUsed,
      maxTokens,
      freeTier: !user?.at(0)?.stripe_customer_id,
    }),
    {
      status: 200,
    }
  )
}
