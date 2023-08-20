import { Folder, Plus, LogOut, PanelLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import useSessionStore from '@/store/useSessionStore'
import { BsThreeDots } from 'react-icons/bs'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

  const { session } = useSessionStore((state) => ({
    session: state.session,
  }))

  return (
    <aside className='relative'>
      {isSidebarOpen ?
        <div className='flex flex-col text-white justify-between absolute lg:static  h-screen'>
          <div className='px-4 pt-4 bg-[#121212] h-full'>
            <ul className='w-60 flex flex-col gap-3'>
              <div className='flex items-center justify-between'>
                <li className=' rounded-xl  w-44 cursor-pointer text-white  '>
                  <button className='h-full w-full flex  items-center px-2 py-5 border border-[#292524] rounded-xl justify-center gap-1' onClick={addOrganization}>
                    <Plus className='w-5 h-5' />
                    <p className='text-lg'>New project</p>
                  </button>
                </li>
                <div className='border border-[#292524] rounded-xl px-4 py-5 cursor-pointer' onClick={() => setIsSidebarOpen(prev => !prev)}>
                  <PanelLeft />
                </div>
              </div>
              {projects && projects.map(project =>
              (<li className={`rounded-xl ${repoSelect?.title === project.title ? 'bg-primary' : 'bg-[#292524] '} text-white cursor-pointer flex hover:bg-primary`} key={project.id}>
                <button className='flex-grow flex justify-between items-center px-4 py-5' onClick={() => handleSelectRepo(project.title)}>
                  <Folder />
                  <p className='text-xl '>{project.title}</p>
                </button>
              </li>))}
            </ul>
          </div>
          <div className='bg-[#050505] w-full py-6 px-4 flex justify-between items-center '>
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
        </div>
        :
        <div className={`${isSidebarOpen && 'border border-[#292524]'} rounded-xl px-4 py-5 cursor-pointer absolute`} onClick={() => setIsSidebarOpen(prev => !prev)}>
          <PanelLeft />
        </div>
      }
    </aside >
  )
}

export default Sidebar
