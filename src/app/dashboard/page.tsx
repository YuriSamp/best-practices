'use client'

import React, { useEffect, useState } from 'react'
import RulesBox from '@/components/rulesBox'
import Sidebar from '@/components/sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSessionStore from '@/store/useSessionStore'
import axios from 'axios';

type Repository = {
  rules: null | string[]
  title: string
  id: number
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Repository[]>([])
  const [repoSelect, setRepoSelected] = useState<Repository | null>()

  const { error, fetchUsers } = useSessionStore((state) => ({
    error: state.error,
    fetchUsers: state.fetchUsers,
  }))

  useEffect(() => {
    (async function GetRepositories() {
      const { data, status } = await axios.get('/api/repositories')

      if (status !== 200) {
        toast.error('Não foi possivel pegar os repositorios')
        return
      }

      setProjects(data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    fetchUsers()
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
