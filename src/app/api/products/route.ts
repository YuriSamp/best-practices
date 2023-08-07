import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export async function GET() {
  const stripeKey = process.env.STRIPE_WEBHOOK_SECRET as string
  const stripe = new Stripe(stripeKey, {
    apiVersion: '2022-11-15',
  })

  const prices = await stripe.prices.list({
    limit: 3,
  })

  return NextResponse.json(prices.data.reverse())
}
