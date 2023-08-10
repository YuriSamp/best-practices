import { App } from 'octokit'

export const getGithubClient = () => {
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
  return app
}
