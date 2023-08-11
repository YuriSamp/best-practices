'use client'

import React, { useEffect, useState } from 'react'
import RulesBox from '@/components/rulesBox'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import useSessionStore from '@/store/useSessionStore'

type Projects = {
  name: string
  id: number
}

const teste = [{ name: 'teste1', id: 1 }, { name: 'teste2', id: 2 }, { name: 'teste3', id: 4 }, { name: 'teste4', id: 5 }, { name: 'teste5', id: 13 }, { name: 'teste6', id: 7 }]
const Dashboard = () => {

  const [projects, setProjects] = useState<Projects[]>(teste)
  const [repoSelect, setRepoSelected] = useState('')
  const supabase = createClientComponentClient()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const repositories = await axios.get('../api/repository')
  //     setProjects(repositories.data.repositories.data.repositories)
  //   }
  //   fetchData()
  // }, [])

  const { error, fetchUsers } = useSessionStore((state) => ({
    error: state.error,
    fetchUsers: state.fetchUsers,
  }))

  useEffect(() => {
    fetchUsers()

    if (error) {
      toast.error('Não foi possivel pegar o usuário')
    }
  }, [fetchUsers, error])

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
