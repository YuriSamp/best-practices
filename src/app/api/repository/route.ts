import { NextResponse } from 'next/server'
import { App } from 'octokit'
import { getSupabaseServerSide } from '@/lib/supabase'

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

  const supabase = getSupabaseServerSide()

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
    console.log({ octokit })
    const repositories = await octokit.request('GET /installation/repositories')
    console.log({ userID: repositories.data.repositories[0].owner.id })
    return NextResponse.json({ repositories })
  } catch (error) {
    console.log(error)
  }
  return new Response(null, {
    status: 500,
  })
}
