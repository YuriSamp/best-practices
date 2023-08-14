'use client'

import { getSupabaseClietSide } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"

const Account = () => {
  const supabase = getSupabaseClietSide()
  const [tokens, setTokens] = useState(750)
  const [maxUsage, setMaxUsage] = useState(10000)


  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser()
      const { data: logs, error: logsError } = await supabase.from('Logs').select().eq('user_id', data.user?.id)
      const { data: maxToknes } = await supabase.from('Users').select().eq('user_uid', data.user?.id)
      // setMaxUsage(maxToknes?.at(0)?.tokens)
      // setTokens(logs?.at(0)?.token_count)
    })()

  }, [])


  return (
    <main className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col'>
        <span>Usage</span>
        <span>{tokens}</span>
        <span>Max usage : {maxUsage}</span>
        <Progress value={(tokens % maxUsage) / 100} />
      </div>
    </main>
  )
}

export default Account
