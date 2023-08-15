'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { getSupabaseClietSide } from '@/lib/supabase'
import { Github } from 'lucide-react'

const devUrl = 'http://localhost:3000/api/callback'

const Auth = () => {
  const supabase = getSupabaseClietSide()

  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: devUrl,
      }
    })
  }

  return (
    <main className='w-full min-h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='bg-[#202020] flex flex-col items-center justify-center gap-5 px-20 pt-12 pb-8 rounded-lg'>
          <h1 className='text-2xl'>Sign In to Best-Practices</h1>
          <span className='text-sm'>Boost your pr to never miss best-practices again</span>
          <div className='my-5'>
            <Button onClick={signInWithGitHub} className='bg-primary text-primary-foreground w-80 h-10 flex gap-3'>
              <Github />
              Continue with Github
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Auth
