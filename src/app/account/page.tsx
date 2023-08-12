'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'

const Account = () => {
  const supabase = createClientComponentClient()
  const [tokens, setTokens] = useState(0)


  useEffect(() => {
    const getTokens = async () => {
      const { data } = await supabase.from('Comments').select('token_count')
      setTokens(data?.map(item => item.token_count).reduce((a, b) => a + b))
    }
    getTokens()
  }, [])


  return (
    <main className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col'>
        <span>Tokens utilizados</span>
        <span>{tokens}</span>
      </div>
    </main>
  )
}

export default Account
