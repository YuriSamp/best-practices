import React, { useEffect, useState } from 'react'
import principles from '../principles.json'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { toast } from 'react-toastify';
import { getSupabaseClietSide } from '@/lib/supabase'
import { Input } from './ui/input';
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
  repository: {
    rules: null | string[]
    title: string
    id: number
  }
}

const RulesBox = ({ repository }: Props) => {
  const [options, setOptions] = useState<string[]>([])
  const supabase = getSupabaseClietSide()

  useEffect(() => {
    setOptions(repository.rules || [])
  }, [repository])

  const handleCheck = (pratices: string) => {
    if (options.filter(item => item === pratices).length > 0) {
      setOptions(options.filter(item => item !== pratices))
    } else {
      setOptions(prev => [...prev, pratices])
    }
  }

  const handleReset = () => {
    setOptions([])
  }

  const handleSaveOptions = async (title: string) => {

    const { error } = await supabase
      .from('Projects')
      .update({ rules: options })
      .eq('title', title)

    if (!error) {
      toast.success("Suas preferencias foram salvas com sucesso")
      return
    }
    toast.error("Aconteceu um erro, tente novamente mais tarde")
  }

  return (
    <div className='flex justify-center  mt-10 mx-14'>
      <div className='w-1/2 '>
        <h2 className='text-3xl mb-10 text-center'>Rules to choose</h2>
        <div className='w-full flex gap-3'>
          <Input className='bg-background focus:ring-transparent border rounded-lg' />
          <Button className='bg-primary text-primary-foreground'>Search</Button>
        </div>
        <ul className='max-h-[75vh] self-start overflow-scroll overflow-x-hidden mt-10'>
          {principles.map(principle => (
            <div className='pb-5 mb-5 border-b border-neutral-400' key={principle.id}>
              <h2 className='w-full text-xl font-medium h-12 flex items-center'>{principle.category}</h2>
              {principle.bestPractices.map(pratices => (
                <div key={pratices.id} className=' flex flex-row items-center gap-3'>
                  <div className='flex gap-3 items-center h-20'>
                    <Checkbox
                      className='border-white'
                      checked={options && !!options.filter(options => options === pratices.name).length}
                      onCheckedChange={() => handleCheck(pratices.name)}
                    />
                    <h2 className='text-lg'>{pratices.name}</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className='w-5 h-5 text-neutral-500' />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='max-w-xs'>{pratices.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </ul>
      </div>
      <div className='flex flex-col items-center w-1/2'>
        <h2 className='text-3xl mb-10'>Rules selected</h2>
        <div className='h-4/5'>
          <ul className='flex flex-wrap gap-4 px-10 w-full max-h-[65vh] overflow-y-scroll justify-center items-center'>
            {options && options.map((pratices, id) => <li className='px-2 py-2 flex items-center bg-[#292524] text-white text-lg rounded-xl' key={id}>{pratices}</li>)}
          </ul>
        </div>
        <div className='flex gap-5 mt-10'>
          <Button className='bg-secondary text-secondary-foreground hover:text-primary-foreground w-24 h-16' onClick={handleReset}>Reset</Button>
          <Button className='bg-primary w-24 h-16' onClick={() => handleSaveOptions(repository.title)}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default RulesBox
