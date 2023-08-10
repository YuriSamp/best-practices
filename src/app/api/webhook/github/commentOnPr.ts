import { getGithubClient } from '@/server/getGithubClient'
import { PullRequestEvent } from '@octokit/webhooks-types'

export const commentOnPr = async (body: string, event: PullRequestEvent) => {
  const app = getGithubClient()
  let error

  if (event.installation) {
    const octokit = await app.getInstallationOctokit(event.installation.id)
    try {
      const {} = await octokit.request(
        'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
        {
          owner: event.repository.owner.login,
          repo: event.repository.name,
          issue_number: event.number,
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
