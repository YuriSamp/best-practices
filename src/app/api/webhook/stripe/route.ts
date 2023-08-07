import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

const endPointSecret = process.env.STRIPE_PAYMENT_WEBHOOK_SECRET

export async function POST(req: Request) {
  const body = await req.text()
  const signatureHeader = req.headers.get('Stripe-Signature') as string
  const signature = signatureHeader.replace('[', '').replace(']', '')
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      endPointSecret as string
    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  console.log(`Unhandled event type ${event.type}`)

  return new Response(null, { status: 200 })
}
