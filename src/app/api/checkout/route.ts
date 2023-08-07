import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
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
