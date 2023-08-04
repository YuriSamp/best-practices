'use client'

import React from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import principals from '../../principals.json'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

const Dashboard = () => {

  const supabase = createClientComponentClient()
  const router = useRouter()

  async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    console.log(data)
  }

  const addOrganization = () => {
    router.push('https://github.com/apps/pr-quality-checker/installations/select_target')
  }


  return (
    <main className='w-full min-h-screen flex  mt-20'>
      <div className='flex w-full ml-20'>
        <ul className='min-w-[320px] self-start'>
          {principals.map(principal => (
            <div key={principal.id} className='flex gap-5 items-center'>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className='min-w-[320px]'>{principal.category}</AccordionTrigger>
                  {principal.bestPractices.map(pratices => (
                    <AccordionContent key={pratices.id} >
                      <div className='max-w-[320px] flex flex-row items-center gap-3'>
                        <Checkbox />
                        <div>
                          <h2 className='text-xl'>{pratices.name}</h2>
                          <p>{pratices.description}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  ))}

                </AccordionItem>
              </Accordion>
            </div>
          ))
          }
        </ul>
        {/* <div className='flex flex-col justify-center items-center gap-3'>
          <Button onClick={getSession}>
            <Github /> Get Session
          </Button>
          <Button onClick={addOrganization}>
            <Github /> Add a organization
          </Button>
          <Button onClick={addOrganization}>
            <Github /> Add a repository
          </Button>
        </div> */}
      </div>
    </main>
  )
}

export default Dashboard
