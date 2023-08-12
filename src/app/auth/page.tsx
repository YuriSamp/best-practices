'use client'

import React from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSupabaseClietSide } from '@/lib/supabase'

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
        <Button onClick={signInWithGitHub}>
          <Github /> Sign in with Github
        </Button>
      </div>
    </main>
  )
}

export default Auth
