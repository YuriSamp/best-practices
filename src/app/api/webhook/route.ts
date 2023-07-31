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

  // const signRequestBody = (secret: string, body: string) =>
  //   'sha256=' +
  //   createHmac('sha256', secret).update(body, 'utf-8').digest('hex');

  // const theirSignature = request.headers.get('x-hub-signature-256');
  // const ourSignature = signRequestBody(secret, String(request.body));

  // if (theirSignature !== ourSignature) {
  //   console.log({ messge: 'assinatura errada' });
  //   return {
  //     statusCode: 401,
  //     body: 'Bad signature',
  //   };
  // }

  const eventType = request.headers.get('x-github-event');
  if (eventType !== 'pull_request') {
    return { statusCode: 200 };
  }

  if (request.body) {
    const reader = request.body.getReader();
    const { done, value } = await reader.read();
    if (done) {
      console.log(value);
    }
    // console.log({ request: request.body.getReader() });
  }
  // const event = request.body?.getReader();
  // if (['reopened', 'opened'].includes(event.action)) {
  //   console.log({ messge: 'assinatura certa' });
  //   await writePullRequestComment({ app, event });
  // }
  // return {
  //   statusCode: 200,
  // };
}
