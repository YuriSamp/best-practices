import useSessionStore from '@/store/useSessionStore'
import React from 'react'
import AvatarWithDropdown from './avatarWithDropdonw'

const Navbar = () => {

  const { session } = useSessionStore((state) => ({
    session: state.session,
  }))

  return (
    <header className='bg-neutral-800 h-20 w-full flex items-center justify-end px-10 z-10 shadow-xl'>
      <div className='flex items-center gap-3'>
        <span className='text-white text-xl'>Yuri</span>
        <AvatarWithDropdown url={session?.user.user_metadata.avatar_url} />
      </div>
    </header>
  )
}

export default Navbar
