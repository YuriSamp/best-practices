import React, { useState } from 'react'
import principles from '../principles.json'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { toast } from 'react-toastify';
import { getSupabaseClietSide } from '@/lib/supabase'

interface Props {
  repository: {
    rules: null | string[]
    title: string
    id: number
  }
}

const RulesBox = ({ repository }: Props) => {
  const [options, setOptions] = useState<string[]>(repository.rules || [])
  const supabase = getSupabaseClietSide()

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
    <div className='flex w-[1000px]'>
      <div className='w-1/2'>
        <ul className='min-w-[370px] max-h-[500px] self-start overflow-scroll overflow-x-hidden ml-7'>
          {principles.map(principle => (
            <div className='pb-5 mb-5 border-b border-neutral-400' key={principle.id}>
              <h2 className='w-full text-xl font-medium h-12 flex items-center'>{principle.category}</h2>
              {principle.bestPractices.map(pratices => (
                <div key={pratices.id} className=' flex flex-row items-center gap-3'>
                  <div className='flex gap-3 items-center h-11'>
                    <Checkbox
                      checked={options && !!options.filter(options => options === pratices.name).length}
                      onCheckedChange={() => handleCheck(pratices.name)}
                    />
                    <h2 className='text-lg' title={pratices.description}>{pratices.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </ul>
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl mb-10'>The rules you chose</h1>
        <ul className='flex flex-wrap  gap-4 px-10 h-[350px] min-w-[600px] overflow-y-scroll justify-center items-start'>
          {options && options.map((pratices, id) => <li className='px-2 h-7 flex items-center border border-neutral-300 text-lg rounded-full' key={id}>{pratices}</li>)}
        </ul>
        <div className='flex gap-5 mt-10'>
          <Button className='bg-red-600' onClick={handleReset}>Reset</Button>
          <Button onClick={() => handleSaveOptions(repository.title)}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default RulesBox
