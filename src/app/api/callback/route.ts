import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data } = await supabase.auth.exchangeCodeForSession(code)
    const { data: user } = await supabase
      .from('Users')
      .select()
      .eq('user_uid', data?.user?.id)

    if (data.user?.id && user?.at(0)?.user_uid) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    const userObj = {
      user_uid: data.user?.id || '',
      email: data.user?.email || '',
      image_url: data.user?.user_metadata.avatar_url,
      userName: data.user?.user_metadata.user_name,
      tokens: 5000,
    }

    const { error } = await supabase.from('Users').insert(userObj)

    if (error) {
      console.log(error)
      return NextResponse.redirect(new URL('/auth', req.url))
    }

    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.redirect(new URL('/auth', req.url))
}
