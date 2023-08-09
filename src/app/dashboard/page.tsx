'use client'

import React, { useEffect, useState } from 'react'
import { Folder, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import principals from '../../principals.json'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


type Principals = {
  pratices: string
  id: number
}


type Projects = {
  name: string
  id: number
}

const Dashboard = () => {

  const teste = [{ name: 'teste1', id: 1 }, { name: 'teste2', id: 2 }, { name: 'teste3', id: 4 }, { name: 'teste4', id: 5 }, { name: 'teste5', id: 13 }, { name: 'teste6', id: 7 }]


  const [projects, setProjects] = useState<Projects[]>(teste)
  const [options, setOptions] = useState<Principals[]>([])
  const [repoSelect, setRepoSelected] = useState('')
  const router = useRouter()

  const addOrganization = () => {
    router.push('https://github.com/apps/pr-quality-checker/installations/select_target')
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const repositories = await axios.get('../api/repository')
  //     setProjects(repositories.data.repositories.data.repositories)
  //   }
  //   fetchData()
  // }, [])


  const handleCheck = (pratices: string, id: number) => {
    if (options.filter(item => item.pratices === pratices).length > 0) {
      setOptions(options.filter(item => item.pratices !== pratices))
    } else {
      setOptions(prev => [...prev, { pratices, id }])
    }
  }

  const handleReset = () => {
    setOptions([])
  }

  const supabase = createClientComponentClient()
  const saveOptions = async (title: string) => {
    const rules = options.map(item => item.pratices)
    const session = await supabase.auth.getSession();
    const user = session.data.session?.user.id;
    const dbobj = {
      title,
      rules,
      user,
    }
    const { data, error } = await supabase
      .from('Projects')
      .insert(dbobj)
      .select()

    if (!error) {
      console.log({ data })
      // caso tudo de certo
      return
    }
    console.log(error)
  }

  const handleSelectRepo = (repo: string) => {
    if (repoSelect === repo) {
      setRepoSelected('')
    } else {
      setRepoSelected(repo)
    }
  }



  console.log(options)

  return (
    <main className='flex flex-row-reverse bg-[#f3f0e8] min-h-screen'>
      <div className='flex flex-col w-full gap-10'>
        <header className='bg-neutral-800 h-20 w-full flex items-center justify-end px-10 z-10 shadow-xl'>
          <div className='flex items-center gap-3'>
            <span className='text-white text-xl'>Yuri</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <section className='flex justify-center items-center h-full'>
          {!!repoSelect.length ?
            <div className='flex w-[1000px]'>
              <div className='w-1/2'>
                <ul className='min-w-[370px] max-h-[500px] self-start overflow-scroll overflow-x-hidden ml-7'>
                  {principals.map(principal => (
                    <div className='pb-5 mb-5 border-b border-neutral-400' key={principal.id}>
                      <h2 className='w-full text-xl font-medium h-12 flex items-center'>{principal.category}</h2>
                      {principal.bestPractices.map(pratices => (
                        <div key={pratices.id} className=' flex flex-row items-center gap-3'>
                          <div className='flex gap-3 items-center h-11'>
                            <Checkbox checked={!!options.filter(options => options.pratices === pratices.name).length} onCheckedChange={() => handleCheck(pratices.name, pratices.id)} />
                            <h2 className='text-lg' title={pratices.description}>{pratices.name}</h2>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col items-center'>
                <h1 className='text-3xl mb-10'>The rules you chose</h1>
                <ul className='flex flex-wrap gap-4 px-10 h-[350px] min-w-[600px] overflow-y-scroll items-center justify-center'>
                  {options.map(item => <li className='px-2 h-7 flex items-center border border-neutral-300 text-lg rounded-full' key={item.id}>{item.pratices}</li>)}
                </ul>
                <div className='flex gap-5 mt-10'>
                  <Button className='bg-red-600' onClick={handleReset}>Reset</Button>
                  <Button>Save</Button>
                </div>
              </div>
            </div>
            :
            <span className='text-4xl'>Select a project to add some rules</span>
          }
        </section>
      </div>
      <aside className='flex flex-col bg-neutral-800 h-screen z-20 text-white'>
        <h2 className='mt-6 mb-14  text-3xl text-center'>Best-Pratices</h2>
        <ul className='w-64  flex flex-col gap-3 p'>
          <li className='mx-4 rounded-xl  cursor-pointer  bg-[#f3f0e8] text-black '>
            <button className='h-full w-full flex justify-between items-center px-4 py-5' onClick={addOrganization}>
              <Github />
              <p className='text-xl'>Add a project</p>
            </button>
          </li>
          {projects.map(project =>
          (<li className={`mx-4 rounded-xl ${repoSelect === project.name ? 'bg-[#dcb482]' : 'bg-[#f3f0e8]'}  text-black  cursor-pointer flex`} key={project.id}>
            <button className='flex-grow flex justify-between items-center px-4 py-5' onClick={() => handleSelectRepo(project.name)}>
              <Folder />
              <p className='text-xl '>{project.name}</p>
            </button>
          </li>))}
        </ul>
      </aside>
    </main>
  )
}

export default Dashboard
