import React, { useEffect, useState } from 'react'
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import useSessionStore from '@/store/useSessionStore';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from 'lucide-react';
import { getSupabaseClietSide } from '@/lib/supabase';
import { useRouter } from 'next/navigation'

type ApiReturn = {
  tokensUsed: number
  maxTokens: number
  freeTier: boolean
}


const DashboardNavbar = () => {
  const router = useRouter()
  const supabase = getSupabaseClietSide()
  const [remainTokens, setReaminTokens] = useState(0)

  const { session } = useSessionStore((state) => ({
    session: state.session,
  }))


  useEffect(() => {
    (async () => {
      const { data, status } = await axios.get<ApiReturn>('/api/user')

      if (status !== 200) {
        toast.error('Não foi possivel pegar os repositorios')
        return
      }

      setReaminTokens(data.maxTokens - data.tokensUsed)
    })()
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Aconteceu um erro, tente novamente mais tarde")
      return
    }
    router.push('/auth')
  }


  return (
    <div className='py-4 flex justify-end px-12 gap-6 items-center border-b bg-[#121212] z-10'>
      <div className='bg-[#166434] flex justify-around gap-4 px-7 py-2 rounded-md'>
        <span>Remaining tokens</span>
        <span>{remainTokens}</span>
      </div>
      <DropdownMenu >
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session?.user.user_metadata.avatar_url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-4'>
          <DropdownMenuItem className='flex gap-1 cursor-pointer' onClick={signOut}>
            <LogOut className='w-5 h-5' />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

export default DashboardNavbar
