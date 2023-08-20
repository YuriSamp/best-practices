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
    <div className='flex justify-center mt-10 mx-5 '>
      <div className='min-w-[280px] sm:w-[400px] md:w-[600px] xl:w-[900px] '>
        <h2 className='text-2xl sm:text-3xl mb-10 text-center'>Search a practice</h2>
        <Input className='bg-background focus:ring-transparent border rounded-lg' />
        <ul className='max-h-[63vh] self-start overflow-scroll overflow-x-hidden mt-10'>
          {principles.map(principle => (
            <div className='pb-5 mb-5 border-b last:border-0 border-neutral-400 w-full' key={principle.id}>
              <h2 className='w-full text-xl font-medium h-12 flex items-center'>{principle.category}</h2>
              {principle.bestPractices.map(pratices => (
                <div key={pratices.id} className={`flex flex-row items-center my-3 w-full`}>
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
        <div className='flex gap-5 mt-10 items-center justify-center'>
          <Button className='bg-secondary text-secondary-foreground hover:text-primary-foreground w-24 h-16' onClick={handleReset}>Reset</Button>
          <Button className='bg-primary w-24 h-16' onClick={() => handleSaveOptions(repository.title)}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default RulesBox
