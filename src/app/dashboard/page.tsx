'use client'

import React from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const Dashboard = () => {

  const supabase = createClientComponentClient()
  const router = useRouter()

  async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    console.log(data)
  }

  const addOrganization = () => {
    router.push('https://github.com/apps/pr-quality-checker/installations/select_target')
  }


  return (
    <main className='w-full min-h-screen flex justify-center items-center'>
      <div className='flex justify-center gap-10 w-full'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <Button onClick={getSession}>
            <Github /> Get Session
          </Button>
          <Button onClick={addOrganization}>
            <Github /> Add a organization
          </Button>
          <Button onClick={addOrganization}>
            <Github /> Add a repository
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
