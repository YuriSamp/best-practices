'use client'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import principals from '../../../principals.json'
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


type Principals = {
  pratices: string
  id: number
}

export default function Project({ params }: { params: { projects: string } }) {
  const [options, setOptions] = useState<Principals[]>([])

  const handleCheck = (pratices: string, id: number) => {
    if (options.filter(item => item.pratices === pratices).length > 0) {
      setOptions(options.filter(item => item.pratices !== pratices))
    } else {
      setOptions(prev => [...prev, { pratices, id }])
    }
  }

  const supabase = createClientComponentClient()
  const saveOptions = async () => {
    const pratices = options.map(item => item.pratices)
    const session = await supabase.auth.getSession();
    const user = session.data.session?.user.id;
    const dbobj = {
      title: params.projects,
      rules: pratices,
      user,
    }
    const { data, error } = await supabase
      .from('Projects')
      .insert(dbobj)
      .select()

    if (!error) {
      console.log({ data })
      // caso tudo de certo
      return
    }
    console.log(error)
  }

  return (
    <main className='flex overflow-y-auto  min-h-screen'>
      <aside className='flex flex-col h-screen border-b border-black '>
        <ul className='min-w-[350px] self-start h-full overflow-scroll overflow-x-hidden ml-7'>
          {principals.map(principal => (
            <div className='py-5 border-b border-neutral-400' key={principal.id}>
              <h2 className='w-full text-xl font-medium h-12 flex items-center'>{principal.category}</h2>
              {principal.bestPractices.map(pratices => (
                <div key={pratices.id} className='min-w-[350px] flex flex-row items-center gap-3'>
                  <div className='flex gap-3 items-center h-11'>
                    <Checkbox onCheckedChange={() => handleCheck(pratices.name, pratices.id)} />
                    <h2 className='text-lg' title={pratices.description}>{pratices.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          ))
          }
        </ul>
        <div className='w-full flex border-t border-r justify-between border-black'>
          <span className='w-1/2 flex justify-center border-r border-black py-3 bg-slate-500'>clear</span>
          <span className='w-1/2 flex justify-center py-3 bg-green-300 hover:cursor-pointer' onClick={saveOptions}>save</span>
        </div>
      </aside>
      <div className='flex flex-col items-center w-full'>
        <header className='bg-black h-20 w-full flex items-center justify-end px-10'>
          <div className='flex items-center gap-3'>
            <span className='text-white text-xl'>Yuri</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>
      </div>
    </main>
  )
}
