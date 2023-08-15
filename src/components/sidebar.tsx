import { Folder, Plus, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import useSessionStore from '@/store/useSessionStore'
import { BsThreeDots } from 'react-icons/bs'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
      <div className='mx-4 mt-4'>
        <ul className='w-60 flex flex-col gap-3'>
          <li className=' rounded-xl  cursor-pointer  text-white  '>
            <button className='h-full w-full flex justify-between items-center px-4 py-5 border border-[#292524] rounded-xl' onClick={addOrganization}>
              <Plus className='w-6 h-6' />
              <p className='text-xl'>New project</p>
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
      <div className='absolute bottom-0 bg-[#050505] w-full py-6 px-4 flex justify-between items-center '>
        <div className='flex items-center gap-3'>
          <Avatar >
            <AvatarImage src={session?.user.user_metadata.avatar_url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='text-white text-xl'>Yuri</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDots className='w-6 h-6 hover:cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='cursor-not-allowed'>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/account'} className='w-full'>
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex gap-1 cursor-pointer'>
              <LogOut className='w-5 h-5' />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </aside>
  )
}

export default Sidebar
