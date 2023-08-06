import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { App } from 'octokit'
import { cookies } from 'next/headers'

export async function GET() {
  const appId = process.env.GITHUB_APP_ID
  const secret = process.env.WEBHOOK_SECRET
  // DEV
  const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n')
  //PROD
  // const privateKey = process.env.PRIVATE_KEY

  const app = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
  })

  const supabase = createRouteHandlerClient({ cookies })
  const session = await supabase.auth.getSession()
  const supabaseUserName = session.data.session?.user.user_metadata.user_name

  try {
    const appUsers = await app.octokit.request('GET /app/installations')
    const user = appUsers.data.filter(
      (user) => user.account?.login === supabaseUserName
    )

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
