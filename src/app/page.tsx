import Link from 'next/link';
import { AiOutlineTool } from 'react-icons/ai'
import PrExample from '../../public/example.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center sm:px-14 lg:px-40 xl:px-64 2xl:px-80 ">
      <header className='flex justify-between items-center mt-5 pb-5 w-full border-b border-neutral-700'>
        <div className='flex items-center gap-3'>
          <AiOutlineTool className='w-6 h-6' />
          <h3 className='text-xl'>Best-pratices</h3>
        </div>
        <nav>
          <ul className='flex items-center gap-5'>
            <li>
              <Link href={'/prices'}>
                <Button className='text-foreground text-base' variant='link'>Prices</Button>
              </Link>
            </li>
            <li>
              <Link href={'#'}>
                <Button className='bg-primary'>
                  Log in
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className='w-full mt-20 mb-10'>
        <h1 className='flex flex-col items-center gap-1'>
          <span className='text-6xl'>Pull request with</span>
          <span className='text-5xl'>The best AI analysis</span>
        </h1>
      </div>
      <div>
        <h3 className='flex flex-col gap-1 items-center text-lg'>
          <span>Unlock the potential of your pull requests with a cutting-edge tool</span>
          <span>that tirelessly monitors, identifies, and delivers a myriad of enhancements.</span>
        </h3>
      </div>
      <section className='my-10'>
        <Link href={'/auth'}>
          <Button className='bg-primary'>
            Get Started
          </Button>
        </Link>
      </section>
      <section className='my-10'>
        <div className='my-5 flex justify-between gap-10' >
          <Image src={PrExample} alt='Pull Request example' width={640} height={440} className='rounded-xl' />
          <ol className='flex flex-col gap-20 w-80'>
            <li>
              <h2 className='text-3xl'>How it works</h2>
            </li>
            <li className='text-xl'>1 install the github app in your repository</li>
            <li className='text-xl'>2 open a pull request with the code changes</li>
            <li className='text-xl'>3 read the suggested changes and make more changes</li>
          </ol>
        </div>
      </section>
      <footer className='flex flex-col my-3 w-full '>
        <div className='flex w-full my-5 py-5 border-b'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <AiOutlineTool className='w-6 h-6' />
              <h3 className='text-xl'>Best-pratices</h3>
            </div>
            Provinding a cutting-edge tool to monitor every pull request you make
          </div>
        </div>
        &#169; 2023 Yuri | Codista
      </footer>
    </main>
  )
}
