import Link from 'next/link';
import { AiOutlineTool } from 'react-icons/ai'
import PrExample from '../../public/example.png'
import Image from 'next/image';

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f5f3f1]">
      <header className='flex justify-between px-96 items-center my-5 w-full'>
        <div className='flex items-center gap-3'>
          <AiOutlineTool className='w-6 h-6' />
          <h3 className='text-xl'>Best-pratices</h3>
        </div>
        <nav>
          <ul className='flex items-center gap-5'>
            <li>
              <Link href={'#'}>Pricing</Link>
            </li>
            <li>
              <Link href={'#'}>Log in</Link>
            </li>
            <li className='px-3 py-1 rounded-lg bg-black text-white'>
              <Link href={'#'}>Sign Up</Link>
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
      <section className='my-20'>
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
      <section className='my-20 text-center'>
        <h2 className='text-3xl'>Somos open-source</h2>
        <p className='my-2 text-lg'>Todo o código desse projeto se encontra hospedado no github</p>
        <p className='text-lg'>Sinta-se livre para ler, revisar, copiar ou contribuir da maneira que quiser</p>
      </section>
      <footer className='mb-5 text-xl'>
        &#169; 2023 Yuri | Codista
      </footer>
    </main>
  )
}
