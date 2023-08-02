import { App } from 'octokit';
import { writePullRequestComment } from './WritePullRequest';
import type { PullRequestEvent } from '@octokit/webhooks-types';

export async function POST(request: Request) {
  const eventType = request.headers.get('x-github-event');

  if (eventType !== 'pull_request') {
    return new Response(null, {
      status: 200,
    });
  }

  const appId = process.env.GITHUB_APP_ID as string;
  const secret = process.env.WEBHOOK_SECRET as string;
  const privateKey = process.env.PRIVATE_KEY as string;
  const app = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
  });

  const event: PullRequestEvent = await request.json();

  if (['reopened', 'opened'].includes(event.action)) {
    await writePullRequestComment({ app, event });
  }

  return new Response(null, {
    status: 200,
  });
}
