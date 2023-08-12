'use client'

import React from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const devUrl = 'http://localhost:3000/dashboard'

const Auth = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()

  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: devUrl,
      }
    })
    router.refresh()
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
