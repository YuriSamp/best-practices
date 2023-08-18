import Link from 'next/link';
import { AiOutlineTool } from 'react-icons/ai'
import PrExample from '../../public/pr.png'
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
import Footer from '@/components/footer';


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center sm:px-14 lg:px-40 xl:px-64 2xl:px-80 ">
      <Navbar />
      <div className='w-full mt-20 mb-10'>
        <h1 className='flex flex-col items-center gap-1'>
          <span className='text-4xl sm:text-6xl'>Pull request with</span>
          <span className='text-2xl sm:text-5xl'>The best AI analysis</span>
        </h1>
      </div>
      <div>
        <h3 className='flex flex-col gap-1 items-center text-lg text-center'>
          <span>Unlock the potential of your pull requests with a cutting-edge tool</span>
          <span>that tirelessly monitors, identifies, and delivers a myriad of enhancements.</span>
        </h3>
      </div>
      <section className='my-8 flex flex-col items-center'>
        <Link href={'/auth'}>
          <Button className='bg-primary'>
            Get Started
          </Button>
        </Link>
      </section>
      <section className='py-10'>
        <ol className='flex flex-col gap-20 pt-5 px-3 items-center  text-center xl:text-left'>
          <li className='my-5 flex flex-col-reverse xl:flex-row justify-between gap-10 '>
            <Image src={Dashboard} alt='Pull Request example' width={900} className='rounded-xl border xl:w-[500px] 2xl:w-[640px]' />
            <div>
              <p className='text-2xl font-bold'>Simplicity in Installing the GitHub App</p>
              <p className='mt-5 text-xl tracking-wide'>Install our GitHub App with just a few clicks. Authorize the permissions and the App will automatically detect the repositories.</p>
            </div>
          </li>
          <li className='my-5 flex justify-between gap-10 flex-col xl:flex-row' >
            <div>
              <p className='text-2xl font-bold'>Simple to keep track your code</p>
              <p className='mt-5 text-lg tracking-wide'>Easily customize code review rules in our dashboard. Activate, deactivate, or edit guidelines with a user-friendly interface. Our documentation will be available for guidance.</p>
            </div>
            <Image src={Dashboard} alt='Pull Request example' width={900} className='rounded-xl border xl:w-[500px] 2xl:w-[640px]' />
          </li>
          <li className='my-5 flex justify-between gap-10 flex-col-reverse xl:flex-row' >
            <Image src={PrExample} alt='Pull Request example' width={900} className='rounded-xl border xl:w-[500px] 2xl:w-[640px]' />
            <div>
              <p className='text-2xl font-bold'>Enhancement in Pull Requests:</p>
              <p className='mt-5 text-lg tracking-wide'>After installation and setup, your pull requests will be automatically evaluated. Receive detailed feedback aligned with the chosen best practices. Effectively improve the quality of your pull requests.</p>
            </div>
          </li>
        </ol>
      </section>
      <section className='my-8  flex flex-col items-center'>
        <h2 className='text-center text-3xl font-bold my-3'>Frequently asked questions.</h2>
        <Accordion type="single" collapsible className=' w-[800px] max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px]'>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className='text-lg sm:text-xl md:text-2xl'>
                What methods of payment do you accept?
              </p>
            </AccordionTrigger>
            <AccordionContent className='text-center sm:text-left text-lg'>
              We accept payments via credit or debit cards, including MasterCard, VISA, American Express, as well as iDeal, SOFORT, Bancontact, Przelewy24, Giropay, EPS, GrabPay, AliPay, and many more
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className=' w-[800px] max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px]'>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className='text-lg sm:text-xl md:text-2xl'>
                Can I cancel my subscription at any time?
              </p>
            </AccordionTrigger>
            <AccordionContent className='text-center sm:text-left text-lg'>
              Yes, you can cancel your subscription at any time. After that, you will be downgraded to the free plan.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className='w-[800px] max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px]'>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className='text-lg sm:text-xl md:text-2xl'>
                What happens when I exceed the limit of my plan?
              </p>
            </AccordionTrigger>
            <AccordionContent className='text-center sm:text-left text-lg'>
              American express, Diners Club, Mastercard, Visa, Union pay, Apple pay, Google pay.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className='w-[800px] max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px]'>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className='text-lg sm:text-xl md:text-2xl'>
                Do you offer refund?
              </p>
            </AccordionTrigger>
            <AccordionContent className='text-center sm:text-left text-lg'>
              We currently do not offer refunds. However, you can cancel your subscription at any time, after which you ${`won't`} be charged again.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Footer />
    </main>
  )
}
