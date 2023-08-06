import { App } from 'octokit'
import type { PullRequestEvent } from '@octokit/webhooks-types'
import { gptAnalysisResult } from './gptAnalysis'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getSupabaseClient } from '@/db/getSupabaseClient'

const IGNORED_FILES = [
  '.yml',
  '.yaml',
  '.md',
  '.json',
  '.lock',
  '.git',
  '.example',
  '.config.',
  '.init.',
  'LICENSE',
]

export async function POST(request: Request) {
  const eventType = request.headers.get('x-github-event')

  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from('repositories').select()

  if (error) {
    console.log(error)
    return new Response(null, {
      status: 500,
    })
  }

  if (eventType !== 'pull_request') {
    return new Response(null, {
      status: 200,
    })
  }

  const appId = process.env.GITHUB_APP_ID as string
  const secret = process.env.WEBHOOK_SECRET as string
  const privateKey = process.env.PRIVATE_KEY as string

  const app = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
  })

  const event: PullRequestEvent = await request.json()

  console.log(event)
  console.log(data[0].title)
  console.log(data[0].rules)

  if (!['reopened', 'opened'].includes(event.action) || !event?.installation) {
    return new Response(null, {
      status: 400,
    })
  }

  const octokit = await app.getInstallationOctokit(event.installation.id)

  const files = await octokit.rest.pulls.listFiles({
    owner: event.repository.owner.login,
    repo: event.repository.name,
    pull_number: event.number,
  })

  const isValidFileExtension = (line: string) => {
    return !IGNORED_FILES.some((ext) => line.includes(ext))
  }

  let prChanges = ''

  files.data.forEach((file) => {
    if (isValidFileExtension(file.filename)) {
      prChanges += file.filename
      prChanges += file.patch
    }
  })

  const aiAnalysis = await gptAnalysisResult(prChanges)

  try {
    if (!aiAnalysis) {
      throw Error('Fail on get Gpt analysis')
    }

    await octokit.request(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
      {
        owner: event.repository.owner.login,
        repo: event.repository.name,
        issue_number: event.number,
        body: aiAnalysis,
      }
    )
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    })
  }

  return new Response(null, {
    status: 200,
  })
}
