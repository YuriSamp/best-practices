import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  const prices = await stripe.prices.list({
    limit: 3,
  })

  return NextResponse.json(prices.data.reverse())
}
