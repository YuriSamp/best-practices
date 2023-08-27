'use client'

import { Button } from '@/components/ui/button'
import { getSupabaseClietSide } from '@/lib/supabase'
import { Github } from 'lucide-react'

const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL || 'http://localhost:3000/api/callback'

const Auth = () => {
  const supabase = getSupabaseClietSide()

  console.log({ CALLBACK_URL, envCallbakck: process.env.CALLBACK_URL })
  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: CALLBACK_URL,
      }
    })
  }

  return (
    <main className='w-full min-h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-3 mx-5'>
        <div className='bg-[#202020] flex flex-col items-center justify-center gap-5 px-5 sm:px-12 pt-12 pb-8 rounded-lg'>
          <h1 className='text-2xl text-center'>Best-Practices</h1>
          <span className='text-sm text-center'>Boost your pr to never miss best-practices again</span>
          <div className='my-5 w-full'>
            <Button onClick={signInWithGitHub} className='bg-primary text-primary-foreground w-full h-10 flex gap-3'>
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
