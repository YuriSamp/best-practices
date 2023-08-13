'use client'

import { useState, useEffect } from 'react'
import { Leaf, Check } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { StripePrice } from '@/types/stripe'

const Prices = () => {

  const [prices, setPrices] = useState<StripePrice[]>([])

  useEffect(() => {
    const getData = async () => {
      const prices = await axios.get('../api/products')
      setPrices(prices.data)
    }
    getData()
  }, [])

  const handleCheckout = async (id: string) => {
    const { data } = await axios.post('../api/checkout', {
      id: id
    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    window.location.assign(data)
  }


  return (
    <main className="flex flex-col h-screen items-center justify-center bg-neutral-500">
      <h1 className='text-4xl font-light pb-5'>Ready to get started ?</h1>
      <p>Choose a plan tailored to your needs</p>
      <div className='flex py-5 gap-4'>
        <span>Monthly</span>
        <Switch />
        <span>Yearly</span>
      </div>
      <section>
        <div className='flex gap-10'>
          {prices.map(price => (
            <div className='rounded-lg bg-white text-neutral-700 w-80 px-5 py-8 shadow-xl border' key={price.id}>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-3'>
                  <Leaf className='w-7 h-7' />
                  <h3 className='text-2xl'>{price.nickname}</h3>
                </div>
                <p className='text-sm'>Perfect to get started</p>
              </div>
              <div className='flex gap-4 py-5'>
                <h1 className='text-5xl'>{(price.unit_amount / 100).toLocaleString('pt-bt', {
                  style: 'currency',
                  currency: 'BRL'
                })}</h1>
                <p className='self-end pb-1'>per month</p>
              </div>
              <button className='w-full h-11 bg-blue-600 text-white rounded-md' onClick={() => handleCheckout(price.id)}>Just buy</button>
              <div className='pt-5'>
                <p className='font-bold'>Lite includes:</p>
                <ul className='flex flex-col gap-3 pt-5'>
                  <li className='flex items-center gap-2'>
                    <Check className='w-6 h-6 text-blue-600' />
                    <p className='text-lg'>CMS integration</p>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='w-6 h-6 text-blue-600' />
                    <p className='text-lg'>CMS integration</p>
                  </li>
                  <li className='flex items-center gap-2'>
                    <Check className='w-6 h-6 text-blue-600' />
                    <p className='text-lg'>CMS integration</p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Prices
