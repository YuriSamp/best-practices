import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_WEBHOOK_SECRET as string
  const stripe = new Stripe(stripeKey, {
    apiVersion: '2022-11-15',
  })

  try {
    let data = await request.json()
    let priceId = data.id
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/dashboard',
      cancel_url: 'http://localhost:3000',
    })
    return NextResponse.json(session.url)
  } catch (error) {
    console.log(error)
  }
}
