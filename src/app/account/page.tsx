'use client'

import { getSupabaseClietSide } from '@/lib/supabase'
import { useEffect, useMemo, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { SpendingChart } from '@/components/spendingChart'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Logs = {
  created_at: string;
  id: number;
  project_id: number;
  token_count: number;
  user_id: string;
}

const Account = () => {
  const supabase = getSupabaseClietSide()
  const [tokens, setTokens] = useState(0)
  const [maxUsage, setMaxUsage] = useState(0)
  const [data, setData] = useState<Logs[]>([])

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser()
      const { data: logs, error: logsError } = await supabase.from('Logs').select().eq('user_id', data.user?.id)
      const { data: maxToknes } = await supabase.from('Users').select().eq('user_uid', data.user?.id)
      if (logs) {
        setData(logs)
      }
      setMaxUsage(maxToknes?.at(0)?.tokens || 0)
      setTokens(logs?.map(log => log.token_count).reduce((a, b) => a + b) || 0)
    })()
  }, [])

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col'>
        <div className='flex gap-3 items-center my-4'>
          <ChevronLeft />
          <span className='text-3xl'>Agosto</span>
          <ChevronRight />
        </div>
        <span>Tokens usage</span>
        <div className='w-[760px] h-[260px] py-6'>
          <SpendingChart
            data2={data}
          />
        </div>
        <div className='flex gap-3 w-full items-center'>
          <Progress value={(tokens % maxUsage) / 100} className='bg-primary-foreground' />
          <div className='flex items-center gap-3'>
            <span>{tokens}</span>
            <span> / </span>
            <span>{maxUsage}</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Account
