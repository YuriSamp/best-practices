'use client'

import React, { useEffect, useState } from 'react'
import { Folder, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import Link from 'next/link'

type Projects = {
  name: string
  id: number
}

const Dashboard = () => {

  const [projects, setProjects] = useState<Projects[]>([])
  const router = useRouter()

  const addOrganization = () => {
    router.push('https://github.com/apps/pr-quality-checker/installations/select_target')
  }

  useEffect(() => {
    const fetchData = async () => {
      const repositories = await axios.get('../api/repository')
      setProjects(repositories.data.repositories.data.repositories)
    }
    fetchData()
  }, [])

  console.log(projects[0])


  return (
    <main className='flex overflow-y-auto bg-[#535219] min-h-screen'>
      <div className='flex flex-col items-center w-full'>
        <header className='bg-black h-20 w-full flex items-center justify-end px-10'>
          <div className='flex items-center gap-3'>
            <span className='text-white text-xl'>Yuri</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>


        <section className='mt-20'>
          <h2 className='text-3xl bold'>Projects</h2>
          <ul className='grid grid-cols-3 gap-6 mt-6'>
            <li className='border w-80 h-40 p-4 rounded-xl bg-neutral-700 cursor-pointer' onClick={addOrganization} >
              <div className='flex justify-between'>
                <Github />
                <p className='text-2xl text-white'>Add new project</p>
              </div>
            </li>
            {projects.map(project =>
            (<li className='border w-80 h-40 p-4 rounded-xl bg-neutral-700 cursor-pointer' key={project.id}>
              <Link href={`./dashboard/${project.name}`} className='flex justify-between w-full h-full'>
                <Folder />
                <p className='text-2xl text-white'>{project.name}</p>
              </Link>
            </li>)
            )}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
