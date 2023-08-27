'use client'

import { useEffect, useMemo, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { SpendingChart } from '@/components/spendingChart'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'

type ApiReturn = {
  tokensUsed: number
  maxTokens: number
  freeTier: boolean
}

const Account = () => {
  const [tokensUsed, setTokensUsed] = useState(0)
  const [maxTokens, setMaxTokens] = useState(0)
  const [freeTier, setFreeTier] = useState(false)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const { data, status } = await axios.get<ApiReturn>('/api/user')

      if (status !== 200) {
        toast.error('Não foi possivel pegar os repositorios')
        return
      }
      setFreeTier(data.freeTier)
      setMaxTokens(data.maxTokens)
      setTokensUsed(data.tokensUsed)
    })()
  }, [])

  const updateFreeTier = () => {
    router.push('/prices')
  }

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <ArrowLeft
        className='w-10 h-10 absolute top-10 left-10 cursor-pointer'
        onClick={() => router.push('/dashboard')}
      />
      <div className='flex flex-col gap-4'>
        <span className='text-center text-3xl sm:text-6xl'>Tokens usados</span>
        <div className='flex gap-3 w-full items-center'>
          <Progress value={100 * tokensUsed / maxTokens} className='bg-primary-foreground' />
          <div className='flex items-center gap-3'>
            <span className='sm:text-2xl'>{tokensUsed}</span>
            <span className='sm:text-2xl'> / </span>
            <span className='sm:text-2xl'>{maxTokens}</span>
          </div>
        </div>
        {freeTier && <Button className='bg-primary' onClick={updateFreeTier}>Update your free tier</Button>}
      </div>
    </main>
  )
}

export default Account
