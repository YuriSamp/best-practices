import { AiOutlineTool } from 'react-icons/ai'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {

  return (
    <header className='flex justify-between items-center mt-5 pb-5 mb-3 w-full border-b border-neutral-700 px-3'>
      <Link href={'/'} className='flex items-center gap-3 cursor-pointer'>
        <AiOutlineTool className='w-6 h-6' />
        <h3 className='sm:text-xl font-bold'>Best-pratices</h3>
      </Link>
      <nav>
        <ul className='flex items-center gap-5'>
          <li>
            <Link href={'/prices'}>
              <Button className='text-foreground text-base' variant='link'>Prices</Button>
            </Link>
          </li>
          <li>
            <Link href={'/auth'}>
              <Button className='bg-primary'>
                Log in
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
