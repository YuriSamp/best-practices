import { Avatar } from '@/components/ui/avatar'
import useSessionStore from '@/store/useSessionStore'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const Navbar = () => {

  const { session } = useSessionStore((state) => ({
    session: state.session,
  }))

  return (
    <header className='bg-neutral-800 h-20 w-full flex items-center justify-end px-10 z-10 shadow-xl'>
      <div className='flex items-center gap-3'>
        <span className='text-white text-xl'>Yuri</span>
        <Avatar>
          <AvatarImage src={session?.user.user_metadata.avatar_url} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Navbar
