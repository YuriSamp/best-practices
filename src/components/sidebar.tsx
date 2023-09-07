import { Folder, Plus, PanelLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Repository = {
  rules: null | string[]
  title: string
  id: number
}

interface SidebarProps {
  projects: Repository[]
  repoSelect: Repository | null | undefined
  setRepoSelected: Dispatch<SetStateAction<Repository | null | undefined>>
}

const Sidebar = ({ projects, repoSelect, setRepoSelected }: SidebarProps) => {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleSelectRepo = (repo: string) => {
    if (repoSelect?.title === repo) {
      return
    } else {
      setRepoSelected(projects?.filter(project => project.title === repo).at(0))
    }
  }

  const addOrganization = () => {
    router.push('https://github.com/apps/pr-quality-checker/installations/select_target')
  }


  return (
    <aside className='relative'>
      {isSidebarOpen ?
        <div className='flex flex-col text-white justify-between absolute lg:static h-screen '>
          <div className='px-4 pt-2 bg-[#121212] h-full'>
            <div className='w-60 flex flex-col gap-3'>
              <div className='flex justify-between px-1 items-center'>
                <div>
                  <h3 className='text-2xl mb-2 '>Best-pratices</h3>
                </div>
                <div className='rounded-xl px-4 py-5 cursor-pointer' onClick={() => setIsSidebarOpen(prev => !prev)}>
                  <PanelLeft />
                </div>
              </div>
              <ul className='flex flex-col gap-3 w-full'>
                <li className='rounded-xl bg-[#292524]  text-white cursor-pointer flex hover:bg-primary'>
                  <button className='flex-grow flex justify-between items-center px-4 py-5' onClick={addOrganization}>
                    <Plus className='w-5 h-5' />
                    <p className='text-xl '>New project</p>
                  </button>
                </li>
                {projects && projects.map(project =>
                (<li className={`rounded-xl ${repoSelect?.title === project.title ? 'bg-primary' : 'bg-[#292524] '} text-white cursor-pointer flex hover:bg-primary`} key={project.id}>
                  <button className='flex-grow flex justify-between items-center px-4 py-5' onClick={() => handleSelectRepo(project.title)}>
                    <Folder />
                    <p className='text-xl '>{project.title}</p>
                  </button>
                </li>))}
              </ul>
            </div>
          </div>
        </div>
        :
        <div className={`${isSidebarOpen && 'border border-[#292524]'} rounded-xl px-4 py-5 cursor-pointer absolute top-1 `} onClick={() => setIsSidebarOpen(prev => !prev)}>
          <PanelLeft />
        </div>
      }
    </aside >
  )
}

export default Sidebar
