import { App } from 'octokit';
import type { PullRequestEvent } from '@octokit/webhooks-types';
import { gptAnalysisResult } from './gptAnalysis';

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

  if (!['reopened', 'opened'].includes(event.action) || !event?.installation) {
    return new Response(null, {
      status: 400,
    });
  }

  const octokit = await app.getInstallationOctokit(event.installation.id);

  const { data } = await octokit.rest.pulls.get({
    owner: event.repository.owner.login,
    repo: event.repository.name,
    pull_number: event.number,
  });

  const changedFiles = data.changed_files;
  console.log(`Número de arquivos alterados: ${changedFiles}`);

  const files = await octokit.rest.pulls.listFiles({
    owner: event.repository.owner.login,
    repo: event.repository.name,
    pull_number: event.number,
  });

  const additions = files.data.map((file: any) => file.patch).join(',');
  const aiAnalysis = await gptAnalysisResult(additions);

  try {
    if (!aiAnalysis) {
      throw Error('Fail on get Gpt analysis');
    }

    await octokit.request(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
      {
        owner: event.repository.owner.login,
        repo: event.repository.name,
        issue_number: event.number,
        body: aiAnalysis,
      }
    );
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
    });
  }

  return new Response(null, {
    status: 200,
  });
}
