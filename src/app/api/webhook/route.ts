import { App } from 'octokit';
import { createHmac } from 'crypto';
import { writePullRequestComment } from './WritePullRequest';
import type { PullRequestEvent } from '@octokit/webhooks-types';

export async function POST(request: Request) {
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

  console.log(
    { githubSignature: request.headers.get('x-hub-signature-256') },
    { githubEvent: request.headers.get('x-github-event') }
  );

  const signRequestBody = (secret: string, body: string) =>
    'sha256=' +
    createHmac('sha256', secret).update(body, 'utf-8').digest('hex');

  const theirSignature = request.headers.get('x-hub-signature-256');
  const ourSignature = signRequestBody(secret, String(request.body));

  if (theirSignature !== ourSignature) {
    return {
      statusCode: 401,
      body: 'Bad signature',
    };
  }

  const eventType = request.headers.get('x-github-event');
  if (eventType !== 'pull_request') {
    return { statusCode: 200 };
  }
  const event: PullRequestEvent = JSON.parse(String(request.body));
  if (['reopened', 'opened'].includes(event.action)) {
    await writePullRequestComment({ app, event });
  }
  return {
    statusCode: 200,
  };
}
