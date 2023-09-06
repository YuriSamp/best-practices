import { handleTier } from '@/lib/Tier'
import { stripe } from '@/lib/stripe'
import { getSupabaseServerSide } from '@/lib/supabase'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_PAYMENT_WEBHOOK_SECRET

export async function POST(req: Request) {
  const body = await req.text()
  const signatureHeader = req.headers.get('Stripe-Signature') as string
  const signature = signatureHeader.replace('[', '').replace(']', '')
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret as string
    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const supabase = getSupabaseServerSide()

  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case 'customer.subscription.deleted': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      const { error } = await supabase
        .from('Users')
        .update({
          stripe_subscription_id: subscription.id,
          stripe_price_id: subscription.items.data[0].price.id,
          stripe_current_period_end: String(new Date()),
          stripe_customer_id: subscription.customer as string,
          tokens: 0,
        })
        .eq('email', session.customer_details?.email)

      if (error) {
        return new Response(error.message, { status: 500 })
      }
    }
    case 'customer.subscription.updated': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      let tokens = 0
      if (subscription.items.data[0].price.unit_amount) {
        tokens = handleTier(subscription.items.data[0].price.unit_amount)
      }

      const { error } = await supabase
        .from('Users')
        .update({
          stripe_price_id: subscription.items.data[0].price.id,
          stripe_current_period_end: String(
            new Date(subscription.current_period_end * 1000)
          ),
          tokens: tokens,
        })
        .eq('email', session.customer_details?.email)

      if (error) {
        return new Response(error.message, { status: 500 })
      }
    }
    case 'checkout.session.completed': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      let tokens = 0
      if (subscription.items.data[0].price.unit_amount) {
        tokens = handleTier(subscription.items.data[0].price.unit_amount)
      }

      const { error } = await supabase
        .from('Users')
        .update({
          stripe_subscription_id: subscription.id,
          stripe_price_id: subscription.items.data[0].price.id,
          stripe_current_period_end: String(
            new Date(subscription.current_period_end * 1000)
          ),
          stripe_customer_id: subscription.customer as string,
          tokens: tokens,
        })
        .eq('email', session.customer_details?.email)

      if (error) {
        return new Response(error.message, { status: 500 })
      }
    }
    case 'invoice.paid': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      let tokens = 0
      if (subscription.items.data[0].price.unit_amount) {
        tokens = handleTier(subscription.items.data[0].price.unit_amount)
      }

      const { error } = await supabase
        .from('Users')
        .update({
          stripe_price_id: subscription.items.data[0].price.id,
          stripe_current_period_end: String(
            new Date(subscription.current_period_end * 1000)
          ),
          tokens: tokens,
        })
        .eq('stripe_subscription_id', subscription.id)

      if (error) {
        return new Response(error.message, { status: 500 })
      }
    }
  }

  return new Response(null, { status: 200 })
}
