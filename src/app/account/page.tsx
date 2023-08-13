'use client'

import { getSupabaseClietSide } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'

const Account = () => {
  const supabase = getSupabaseClietSide()
  const [tokens, setTokens] = useState(0)


  useEffect(() => {
    const getTokens = async () => {
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
