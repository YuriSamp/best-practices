'use client'

import React from 'react'
import { Leaf, Check } from 'lucide-react'
import axios from 'axios'
import { StripePrice } from '@/types/stripe'
import { Button } from '@/components/ui/button'
import { handleTier } from '@/lib/Tier'

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

  const isOdd = (number: number) => number % 2 !== 0

  return (
    <section className='mt-12 flex flex-col items-center justify-center'>
      <h1 className='text-4xl sm:text-7xl font-light pb-5'>Choose your plan</h1>
      <p className='text-lg text-center'>The first 5 pull requests will be free, no credit card required</p>
      <div className='flex flex-col lg:flex-row gap-10 mt-10'>
        {prices.map((price, i) => (
          <div className='flex flex-col' key={price.id}>
            {isOdd(i) ? <p className='text-2xl text-center'>Most Popular</p> : <div className='h-8' />}
            <div className={`${isOdd(i) && 'border-green-400'}  bg-[#121212] rounded-lg  w-80 px-5 py-8 mt-2 shadow-xl border relative`} >
              <div className='flex flex-col items-center gap-1'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-3xl font-bold'>{price.nickname}</h3>
                </div>
              </div>
              <div className='flex flex-col items-center gap-4 py-5'>
                <h1 className='text-5xl'>{(price.unit_amount / 100).toLocaleString('pt-bt', {
                  style: 'currency',
                  currency: 'BRL'
                })}</h1>
                <p className='pb-1'>per month</p>
              </div>
              <div className='pt-5'>
                <ul className='flex flex-col'>
                  <li className='flex justify-center'>
                    <p className='text-2xl  '>{handleTier(price.unit_amount)} Tokens</p>
                  </li>
                </ul>
              </div>
              <Button className='w-full h-11 bg-primary mt-10' onClick={() => handleCheckout(price.id)}>Get Tokens</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PricesBox
