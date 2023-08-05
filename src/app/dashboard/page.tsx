'use client'

import React, { useState } from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import principals from '../../principals.json'
import { Avatar } from '@/components/ui/avatar'
import { Checkbox } from "@/components/ui/checkbox"
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'

const Dashboard = () => {

  const [projects, setProjects] = useState([])

  const router = useRouter()

  const addOrganization = () => {
    router.push('https://github.com/apps/pr-quality-checker/installations/select_target')
  }

  const getRepositores = async () => {
    const repositories = await axios.get('../api/repository')
    setProjects(repositories.data.repositories.data.repositories)
  }


  return (
    <main className='flex overflow-y-auto'>
      <aside className='flex ml-7 '>
        <ul className='min-w-[320px] h-screen self-start overflow-scroll overflow-x-hidden'>
          {principals.map(principal => (
            <div className='py-5 border-b border-neutral-400' key={principal.id}>
              <h2 className='min-w-[350px] text-xl font-medium h-12 flex items-center'>{principal.category}</h2>
              {principal.bestPractices.map(pratices => (
                <div key={pratices.id} className='min-w-[350px] flex flex-row items-center gap-3'>
                  <div className='flex gap-3 items-center h-11'>
                    <Checkbox />
                    <div>
                      <h2 className='text-lg' title={pratices.description}>{pratices.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
          }
        </ul>
      </aside>
      <div className='flex flex-col w-full'>
        <header className='bg-black h-20 w-full flex items-center justify-end px-10'>
          <div className='flex items-center gap-3'>
            <span className='text-white text-xl'>Yuri</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <Button onClick={getRepositores}>
          <Github /> Get repository
        </Button>

        <section className='mt-20'>
          <div className='border border-red-500 rounded-sm m-10 h-20 flex justify-end items-center px-5'>
            <Button onClick={addOrganization}>
              <Github /> Add a repository
            </Button>
          </div>
        </section>
        <section className='mt-20'>
          <ul className='flex flex-col gap-3'>
            {projects.map(project =>
            (<li className='text-3xl text-red-400' key={project.id}>
              {project.name}
            </li>))}
          </ul>

        </section>
      </div>
    </main>
  )
}

export default Dashboard
