import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { App } from 'octokit'
import { cookies } from 'next/headers'

export async function GET() {
  const appId = process.env.GITHUB_APP_ID as string
  const secret = process.env.WEBHOOK_SECRET as string
  const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n') as string

  const app = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
  })

  const supabase = createRouteHandlerClient({ cookies })

  try {
    const session = await supabase.auth.getSession()
    const supabaseUserName = session.data.session?.user.user_metadata.user_name
    const appUsers = await app.octokit.request('GET /app/installations')

    const user = appUsers.data.filter((user) => {
      if (user.account && 'login' in user.account) {
        user.account.login === supabaseUserName
      }
      return user
    })

    const octokit = await app.getInstallationOctokit(user[0].id)
    const repositories = await octokit.request('GET /installation/repositories')
    return NextResponse.json({ repositories })
  } catch (error) {
    console.log(error)
  }
  return new Response(null, {
    status: 500,
  })
}
