import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_WEBHOOK_SECRET as string
export const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-11-15',
  typescript: true,
})
