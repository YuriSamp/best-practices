import React, { useState } from 'react'
import principals from '../principals.json'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-toastify';

type Principals = {
  pratices: string
  id: number
}

const RulesBox = ({ repository }: { repository: string }) => {
  const supabase = createClientComponentClient()
  const [options, setOptions] = useState<Principals[]>([])

  const handleCheck = (pratices: string, id: number) => {
    if (options.filter(item => item.pratices === pratices).length > 0) {
      setOptions(options.filter(item => item.pratices !== pratices))
    } else {
      setOptions(prev => [...prev, { pratices, id }])
    }
  }

  const handleReset = () => {
    setOptions([])
  }

  const saveOptions = async (title: string) => {
    const rules = options.map(item => item.pratices)
    const session = await supabase.auth.getSession();
    const user = session.data.session?.user.id;
    const dbobj = {
      title,
      rules,
      user,
    }
    const { data, error } = await supabase
      .from('Projects')
      .insert(dbobj)
      .select()

    if (!error) {
      console.log({ data })
      toast.success("Suas preferencias foram salvas com sucesso")
      return
    }
    toast.error("Aconteceu um erro, tente novamente mais tarde")
  }

  return (
    <div className='flex w-[1000px]'>
      <div className='w-1/2'>
        <ul className='min-w-[370px] max-h-[500px] self-start overflow-scroll overflow-x-hidden ml-7'>
          {principals.map(principal => (
            <div className='pb-5 mb-5 border-b border-neutral-400' key={principal.id}>
              <h2 className='w-full text-xl font-medium h-12 flex items-center'>{principal.category}</h2>
              {principal.bestPractices.map(pratices => (
                <div key={pratices.id} className=' flex flex-row items-center gap-3'>
                  <div className='flex gap-3 items-center h-11'>
                    <Checkbox checked={!!options.filter(options => options.pratices === pratices.name).length} onCheckedChange={() => handleCheck(pratices.name, pratices.id)} />
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
        <ul className='flex flex-wrap gap-4 px-10 h-[350px] min-w-[600px] overflow-y-scroll items-center justify-center'>
          {options.map(item => <li className='px-2 h-7 flex items-center border border-neutral-300 text-lg rounded-full' key={item.id}>{item.pratices}</li>)}
        </ul>
        <div className='flex gap-5 mt-10'>
          <Button className='bg-red-600' onClick={handleReset}>Reset</Button>
          <Button onClick={() => saveOptions(repository)}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default RulesBox
