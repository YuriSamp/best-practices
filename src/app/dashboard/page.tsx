'use client'

import React, { useEffect, useState } from 'react'
import RulesBox from '@/components/rulesBox'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import useSessionStore from '@/store/useSessionStore'
import { useRepositoriesStore } from '@/store/useRepositoriesStore'

const Dashboard = () => {

  const [repoSelect, setRepoSelected] = useState('')
  const supabase = createClientComponentClient()

  const { fetchProjects, projectsError, projects } = useRepositoriesStore((state) => ({
    fetchProjects: state.fetchProjects,
    projects: state.projects,
    projectsError: state.error
  }))

  const { error, fetchUsers } = useSessionStore((state) => ({
    error: state.error,
    fetchUsers: state.fetchUsers,
  }))

  useEffect(() => {
    fetchUsers()
    fetchProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (projectsError) {
      toast.error('Não foi possivel pegar os repositorios')
      return
    }
    if (error) {
      toast.error('Não foi possivel pegar o usuário')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='flex flex-row-reverse bg-[#f3f0e8] min-h-screen'>
      <div className='flex flex-col w-full gap-10'>
        <Navbar />
        <section className='flex justify-center items-center h-full'>
          <ToastContainer
            position='top-center'
            theme='dark'
          />
          {!!repoSelect.length ?
            <RulesBox
              repository={repoSelect}
              supabase={supabase}
            />
            :
            <span className='text-4xl'>Select a project to add some rules</span>
          }
        </section>
      </div>
      <Sidebar
        projects={projects}
        repoSelect={repoSelect}
        setRepoSelected={setRepoSelected}
      />
    </main>
  )
}

export default Dashboard
