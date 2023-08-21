import type { PullRequestEvent } from '@octokit/webhooks-types'
import { gptAnalysisResult } from './gptAnalysis'
import { getSupabaseServerSide } from '@/lib/supabase'
import { getGithubClient } from '@/server/getGithubClient'
import { commentOnPr } from './commentOnPr'
import { BASE_LIMIT_EXCEEDED } from './prCommentTemplates'
import { isValidFileExtension } from './FileExtensionsValidator'

type repo = {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
}

export async function POST(request: Request) {
  const eventType = request.headers.get('x-github-event')

  if (
    eventType !== 'pull_request' &&
    eventType !== 'installation_repositories'
  ) {
    return new Response(null, {
      status: 200,
    })
  }

  const supabase = getSupabaseServerSide()
  const app = getGithubClient()

  if (eventType === 'installation_repositories') {
    const event = await request.json()
    if (event.action === 'added') {
      event.repositories_added.forEach((repository: repo) => {
        console.log(repository)
      })

      //Depois eu tenho que iterar caso o usuário queira adicionar x repos
      const projectObj = {
        user: event.sender.login,
        title: event.repositories_added.at(0).name,
      }

      const { error } = await supabase.from('Projects').insert(projectObj)

      if (error) {
        return new Response(error.message, {
          status: 200,
        })
      }
      return new Response(null, {
        status: 200,
      })
    }

    if (event.action === 'removed') {
      event.repositories_removed.forEach((repository: repo) => {
        console.log(repository)
      })

      return new Response(null, {
        status: 200,
      })
    }
  }

  const event: PullRequestEvent = await request.json()

  if (!['reopened', 'opened'].includes(event.action) || !event?.installation) {
    return new Response(null, {
      status: 400,
    })
  }

  const { data, error } = await supabase
    .from('Projects')
    .select()
    .eq('title', event.repository.name)

  if (error) {
    console.log(error)
    return new Response(error.message, {
      status: 500,
    })
  }

  const { data: userData, error: retriveUserError } = await supabase
    .from('Users')
    .select()
    .eq('userName', data[0].user)

  const user = userData?.at(0)

  if (retriveUserError) {
    return new Response(retriveUserError.message, {
      status: 500,
    })
  }

  if (user) {
    const { data: logs } = await supabase
      .from('Logs')
      .select()
      .eq('user_id', user?.user_uid)

    if (logs && logs?.length >= 5) {
      const LIMIT_EXCEEDED = BASE_LIMIT_EXCEEDED.replace(
        '$USER',
        event.repository.owner.login
      )

      const { error } = await commentOnPr(LIMIT_EXCEEDED, event)

      if (error) {
        throw Error(error.message)
      }

      return new Response(null, {
        status: 200,
      })
    }
  }

  const repository = data
    .filter((repository) => repository.title === event.repository.name)
    .at(0)

  const octokit = await app.getInstallationOctokit(event.installation.id)

  const files = await octokit.rest.pulls.listFiles({
    owner: event.repository.owner.login,
    repo: event.repository.name,
    pull_number: event.number,
  })

  let prChanges = ''

  files.data.forEach((file) => {
    if (isValidFileExtension(file.filename)) {
      prChanges += file.filename
      prChanges += file.patch
    }
  })

  const { content, openAiError, tokens } = await gptAnalysisResult(
    prChanges,
    repository?.rules as string[]
  )

  try {
    if (openAiError) {
      throw Error('Fail on get Gpt analysis')
    }

    const { error } = await commentOnPr(content, event)

    if (error) {
      throw Error(error.message)
    }

    await supabase.from('Logs').insert({
      project_id: repository?.id as number,
      token_count: tokens,
      user_id: user?.user_uid as string,
    })
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    })
  }

  return new Response(null, {
    status: 200,
  })
}
