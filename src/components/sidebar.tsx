import { Folder, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'


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
    <aside className='flex flex-col bg-neutral-800 h-screen z-20 text-white'>
      <h2 className='mt-6 mb-14  text-3xl text-center'>Best-Pratices</h2>
      <ul className='w-64  flex flex-col gap-3 p'>
        <li className='mx-4 rounded-xl  cursor-pointer  bg-[#f3f0e8] text-black '>
          <button className='h-full w-full flex justify-between items-center px-4 py-5' onClick={addOrganization}>
            <Github />
            <p className='text-xl'>Add a project</p>
          </button>
        </li>
        {projects && projects.map(project =>
        (<li className={`mx-4 rounded-xl ${repoSelect?.title === project.title ? 'bg-[#dcb482]' : 'bg-[#f3f0e8]'}  text-black  cursor-pointer flex`} key={project.id}>
          <button className='flex-grow flex justify-between items-center px-4 py-5' onClick={() => handleSelectRepo(project.title)}>
            <Folder />
            <p className='text-xl '>{project.title}</p>
          </button>
        </li>))}
      </ul>
    </aside>
  )
}

export default Sidebar
