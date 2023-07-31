import React from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Auth = () => {
  return (
    <main className='w-full min-h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <Button>
          <Github /> Sign in with Github
        </Button>
      </div>
    </main>
  )
}

export default Auth
