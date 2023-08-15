'use client'

import React, { useEffect, useState } from 'react'
import RulesBox from '@/components/rulesBox'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSessionStore from '@/store/useSessionStore'
import { getSupabaseClietSide } from '@/lib/supabase'

type Repository = {
  rules: null | string[]
  title: string
  id: number
}

const Dashboard = () => {

  const supabase = getSupabaseClietSide()
  const [projects, setProjects] = useState<Repository[]>([])
  const [repoSelect, setRepoSelected] = useState<Repository | null>()

  const { error, fetchUsers } = useSessionStore((state) => ({
    error: state.error,
    fetchUsers: state.fetchUsers,
  }))

  useEffect(() => {
    (async function GetRepositories() {
      const { data } = await supabase.auth.getUser()

      const { data: repos, error } = await supabase
        .from('Projects')
        .select()
        .eq('user', data.user?.user_metadata.user_name)

      if (error) {
        toast.error('Não foi possivel pegar os repositorios')
        return
      }

      setProjects(repos)
    })()
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (error) {
      toast.error('Não foi possivel pegar o usuário')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='flex  bg-background min-h-screen'>
      <Sidebar
        projects={projects}
        repoSelect={repoSelect}
        setRepoSelected={setRepoSelected}
      />
      <section className='w-full min-h-screen'>
        <ToastContainer
          position='top-center'
          theme='dark'
        />
        {repoSelect ?
          <RulesBox
            repository={repoSelect}
          />
          :
          <div className='w-full h-full flex items-center justify-center'>
            <span className='text-4xl'>Select a project to add some rules</span>
          </div>
        }
      </section>
    </main>
  )
}

export default Dashboard
