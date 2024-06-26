import { getGithubClient } from '@/server/getGithubClient'
import { PullRequestEvent } from '@octokit/webhooks-types'

export const commentOnPr = async (body: string, event: PullRequestEvent) => {
  const app = getGithubClient()
  let error
  let commentId = 0

  if (event.installation) {
    const octokit = await app.getInstallationOctokit(event.installation.id)
    try {
      const { data } = await octokit.request(
        'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
        {
          owner: event.repository.owner.login,
          repo: event.repository.name,
          issue_number: event.number,
          body: body,
        }
      )
      commentId = data.id
    } catch (err) {
      if (err instanceof Error) {
        error = err
      }
    }
  } else {
    error = new Error('event installation is missing')
  }

  return { error, commentId }
}

export const updateCommentOnPr = async (
  commetId: number,
  body: string,
  event: PullRequestEvent
) => {
  const app = getGithubClient()
  let error

  if (event.installation) {
    const octokit = await app.getInstallationOctokit(event.installation.id)
    try {
      await octokit.request(
        'PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}',
        {
          owner: event.repository.owner.login,
          repo: event.repository.name,
          comment_id: commetId,
          body: body,
        }
      )
    } catch (err) {
      if (err instanceof Error) {
        error = err
      }
    }
  } else {
    error = new Error('event installation is missing')
  }

  return { error }
}
