export interface StripePrice {
  id: string
  object: string
  active: boolean
  billing_scheme: string
  created: number
  currency: string
  custom_unit_amount: null
  livemode: boolean
  lookup_key: null
  nickname: null
  product: string
  recurring: Recurring
  tax_behavior: string
  tiers_mode: null
  transform_quantity: null
  type: string
  unit_amount: number
  unit_amount_decimal: string
}

export interface Recurring {
  aggregate_usage: null
  interval: string
  interval_count: number
  usage_type: string
}
