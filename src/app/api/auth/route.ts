import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const user = await supabase.auth.getUser()

  if (user.data) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  } else {
    return NextResponse.redirect(new URL('/auth', req.url))
  }
}
