import { Folder } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import useSessionStore from '@/store/useSessionStore'
import { BsThreeDots } from 'react-icons/bs'
import Link from 'next/link'

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

  const { session } = useSessionStore((state) => ({
    session: state.session,
  }))

  return (
    <aside className='flex flex-col bg-[#121212] h-screen text-white relative w-80'>
      <div className='mx-4 mt-24'>
        <div className='flex justify-start my-4 text-2xl'>
          <h2>Projects</h2>
        </div>
        <ul className='w-60 flex flex-col gap-3'>
          <li className=' rounded-xl  cursor-pointer  bg-[#292524] text-white  '>
            <button className='h-full w-full flex justify-center px-4 py-5' onClick={addOrganization}>
              <p className='text-xl'>New project</p>
            </button>
          </li>
          {projects && projects.map(project =>
          (<li className={`rounded-xl ${repoSelect?.title === project.title ? 'bg-primary' : 'bg-[#292524] '} text-white cursor-pointer flex`} key={project.id}>
            <button className='flex-grow flex justify-between items-center px-4 py-5' onClick={() => handleSelectRepo(project.title)}>
              <Folder />
              <p className='text-xl '>{project.title}</p>
            </button>
          </li>))}
        </ul>
      </div>
      <div className='absolute bottom-0 bg-[#050505] w-full py-6 px-4 flex justify-between items-center '>
        <div className='flex items-center gap-3'>
          <Avatar >
            <AvatarImage src={session?.user.user_metadata.avatar_url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='text-white text-xl'>Yuri</span>
        </div>
        <Link href={'/account'}>
          <BsThreeDots className='w-6 h-6 hover:cursor-pointer' />
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
