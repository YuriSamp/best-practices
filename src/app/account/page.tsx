'use client'

import { getSupabaseClietSide } from '@/lib/supabase'
import { useEffect, useMemo, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { SpendingChart } from '@/components/spendingChart'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

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
      <ArrowLeft
        className='w-10 h-10 absolute top-10 left-10 cursor-pointer'
        onClick={() => router.push('/dashboard')}
      />
      <div className='flex flex-col gap-4'>
        {/* <div className='flex gap-3 items-center my-4'>
          <ChevronLeft />
          <span className='text-3xl'>Agosto</span>
          <ChevronRight />
        </div> */}
        <span className='text-center text-3xl sm:text-6xl'>Tokens usados</span>
        {/* <div className='w-[320px] sm:w-[460px] md:w-[560px] xl:w-[760px] h-[260px] py-6'>
          <SpendingChart
            data2={data}
          />
        </div> */}
        <div className='flex gap-3 w-full items-center'>
          <Progress value={(tokens % maxUsage) / 100} className='bg-primary-foreground' />
          <div className='flex items-center gap-3'>
            <span className='sm:text-2xl'>{tokens}</span>
            <span className='sm:text-2xl'> / </span>
            <span className='sm:text-2xl'>{maxUsage}</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Account
