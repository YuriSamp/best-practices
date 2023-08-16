import Link from 'next/link';
import { AiOutlineTool } from 'react-icons/ai'
// import PrExample from '../../public/example.png'
import Dashboard from '../../public/dashboard.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Navbar from '@/components/navbar';


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center sm:px-14 lg:px-40 xl:px-64 2xl:px-80 ">
      <Navbar />
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
      <section className='py-10'>
        <h2 className='text-center text-3xl font-bold py-3'>The most dead-simple tool to improve your pull request</h2>
        <ol className='flex flex-col gap-10 pt-5'>
          <li className='my-5 flex justify-between gap-10'>
            <Image src={Dashboard} alt='Pull Request example' width={600} />
            <div>
              <p className='text-2xl font-bold'>Simplicity in Installing the GitHub App</p>
              <p className='mt-5 text-lg'>Install our GitHub App with just a few clicks. Authorize the permissions and the App will automatically detect the repositories. No complex configurations.</p>
            </div>
          </li>
          <li className='my-5 flex justify-between gap-10' >
            <div>
              <p className='text-2xl font-bold'>Simple to keep track your code</p>
              <p className='mt-5 text-lg'>Easily customize code review rules in our dashboard. Activate, deactivate, or edit guidelines with a user-friendly interface. Our documentation will be available for guidance.</p>
            </div>
            <Image src={Dashboard} alt='Pull Request example' width={640} className='rounded-xl' />
          </li>
          <li className='my-5 flex justify-between gap-10' >
            <Image src={Dashboard} alt='Pull Request example' width={640} className='rounded-xl' />
            <div>
              <p className='text-2xl font-bold'>Enhancement in Pull Requests:</p>
              <p className='mt-5 text-lg'>After installation and setup, your pull requests will be automatically evaluated. Receive detailed feedback aligned with the chosen best practices. Effectively improve the quality of your pull requests.</p>
            </div>
          </li>
        </ol>
      </section>
      <section className='my-8'>
        <h2 className='text-center text-3xl font-bold my-3'>Frequently asked questions.</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className='text-3xl'>
                What methods of payment do you accept?
              </p>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className='text-3xl'>
                Can I cancel my subscription at any time?
              </p>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className='w-[800px]'>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className='text-3xl'>
                Do you offer refund?
              </p>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <footer className='flex flex-col  pt-10 mb-3 w-full '>
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
