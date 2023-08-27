'use client'

import React from 'react'
import { Leaf, Check } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { StripePrice } from '@/types/stripe'
import { Button } from '@/components/ui/button'

const PricesBox = ({ prices }: { prices: StripePrice[] }) => {

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
    <section className='mt-24 flex flex-col items-center justify-center'>
      <h1 className='text-4xl sm:text-5xl font-light  pb-5'>Choose your plan</h1>
      <p className='text-lg text-center'>The first 5 pull requests will be free, no credit card required</p>
      <div className='flex py-5 gap-4'>
        <span>Billed Monthly</span>
        <Switch />
        <span>Billed Annually</span>
      </div>
      <div className='flex flex-col lg:flex-row gap-10 mt-10'>
        {prices.map(price => (
          <div className='rounded-lg bg-[#121212] text-white w-80 px-5 py-8 shadow-xl border' key={price.id}>
            <div className='flex flex-col items-center gap-1'>
              <div className='flex items-center gap-3'>
                <Leaf className='w-7 h-7' />
                <h3 className='text-3xl font-bold'>{price.nickname}</h3>
              </div>
              <p className='text-sm'>Perfect to get started</p>
            </div>
            <div className='flex flex-col items-center gap-4 py-5'>
              <h1 className='text-5xl'>{(price.unit_amount / 100).toLocaleString('pt-bt', {
                style: 'currency',
                currency: 'BRL'
              })}</h1>
              <p className='pb-1'>per month</p>
            </div>
            <Button className='w-full h-11 bg-primary' onClick={() => handleCheckout(price.id)}>Get started</Button>
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
  )
}

export default PricesBox
