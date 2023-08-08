'use client'

import React, { useEffect } from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'



const Auth = () => {
  const supabase = createClientComponentClient()

  async function signInWithGitHub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }



  useEffect(() => {
    async function getSession() {
      const { data, } = await supabase.auth.getSession()
      console.log(data)
    }
    getSession()
  }, [])

  return (
    <main className='w-full min-h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <Button onClick={signInWithGitHub}>
          <Github /> Sign in with Github
        </Button>
      </div>
    </main>
  )
}

export default Auth
