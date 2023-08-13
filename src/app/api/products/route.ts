import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  const prices = await stripe.prices.list()

  const actualProdutcs = prices.data.filter((item) => item.type === 'recurring')

  return NextResponse.json(actualProdutcs.reverse())
}
