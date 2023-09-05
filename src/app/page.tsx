'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

const ACCORDiON_CONTENT = [
  {
    "title": "What methods of payment do you accept?",
    "description": "We accept payments via credit or debit cards, including MasterCard, VISA, American Express, as well as iDeal, SOFORT, Bancontact, Przelewy24, Giropay, EPS, GrabPay, AliPay, and many more"
  },
  {
    "title": "Can I cancel my subscription at any time?",
    "description": "Yes, you can cancel your subscription at any time. After that, you will be downgraded to the free plan."
  },
  {
    "title": "What happens when I exceed the limit of my plan?",
    "description": "You will be charged an additional fee for each pull request."
  },
  {
    "title": "Do you offer refund?",
    "description": "We currently do not offer refunds. However, you can cancel your subscription at any time, after which you won't be charged again."
  }
]


export default function Home() {

  const [authUrl, setAuthUrl] = useState('')

  useEffect(() => {
    (async () => {
      const supabase = createClientComponentClient()

      const response = await supabase.auth.getUser()
      if (!response.error) {
        setAuthUrl('/dashboard')
        return
      }

      setAuthUrl('/auth')

    })()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center sm:px-14 lg:px-40 xl:px-64 2xl:px-80 ">
      <Navbar />
      <div className='w-full mt-20 mb-10'>
        <h1 className='flex flex-col gap-1 text-center'>
          <span className='text-4xl sm:text-6xl'>Pull request with</span>
          <span className='text-2xl sm:text-5xl'>The best AI analysis</span>
        </h1>
      </div>
      <div className='w-full'>
        <h3 className='flex flex-col gap-1 text-lg text-center px-4 '>
          <span>Unlock the potential of your pull requests with a cutting-edge tool</span>
          <span>that tirelessly monitors, identifies, and delivers a myriad of enhancements.</span>
        </h3>
      </div>
      <section className='my-8 flex flex-col'>
        <Link href={authUrl}>
          <Button className='bg-primary w-60 text-xl h-16'>
            Start a new project
          </Button>
        </Link>
      </section>
      <section className='py-10'>
        <ol className='flex flex-col gap-32 pt-5 px-3 items-center  text-center xl:text-left'>
          <li className='my-5 flex flex-col-reverse xl:flex-row justify-between gap-10 '>
            <video autoPlay={true} loop={true} muted={true} className='rounded-xl border xl:w-[600px] 2xl:w-[700px]' >
              <source src="/install-app.mp4" type="video/mp4" />
            </video>
            <div>
              <p className='text-4xl font-bold'>Simplicity in Installing the GitHub App</p>
              <p className='mt-5 text-2xl tracking-wide'>Install our GitHub App with just a few clicks. Authorize the permissions and the App will automatically detect the repositories.</p>
            </div>
          </li>
          <li className='my-5 flex justify-between gap-10 flex-col xl:flex-row' >
            <div>
              <p className='text-4xl font-bold'>Simple to keep track your code</p>
              <p className='mt-5 text-2xl tracking-wide'>Easily customize code review rules in our dashboard. Activate, deactivate, or edit guidelines with a user-friendly interface. Our documentation will be available for guidance.</p>
            </div>
            <video autoPlay={true} loop={true} muted={true} className='rounded-xl border xl:w-[600px] 2xl:w-[700px]' >
              <source src="/save-preference.mp4" type="video/mp4" />
            </video>
          </li>
          <li className='my-5 flex justify-between gap-10 flex-col-reverse xl:flex-row' >
            <video autoPlay={true} loop={true} muted={true} className='rounded-xl border xl:w-[600px] 2xl:w-[700px]' >
              <source src="/pr-comment.mp4" type="video/mp4" />
            </video>
            <div>
              <p className='text-4xl font-bold'>Enhancement in Pull Requests</p>
              <p className='mt-5 text-2xl tracking-wide'>After installation and setup, your pull requests will be automatically evaluated. Receive detailed feedback aligned with the chosen best practices. Effectively improve the quality of your pull requests.</p>
            </div>
          </li>
        </ol>
      </section>
      <section className='my-8  flex flex-col items-center'>
        <h2 className='text-center text-3xl font-bold my-3'>Frequently asked questions.</h2>
        {ACCORDiON_CONTENT.map((accordion, i) => (
          <Accordion type="single" collapsible className=' w-[800px] max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px]' key={i}>
            <AccordionItem value="item-1">
              <AccordionTrigger className='hover:no-underline hover:text-gray-400'>
                <p className='text-lg sm:text-xl md:text-2xl '>
                  {accordion.title}
                </p>
              </AccordionTrigger>
              <AccordionContent className='text-center sm:text-left text-lg'>
                {accordion.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
      <Footer />
    </main>
  )
}
