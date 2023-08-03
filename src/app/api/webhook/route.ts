import { App } from 'octokit';
import type { PullRequestEvent } from '@octokit/webhooks-types';
import { context as github_context } from '@actions/github';

const context = github_context;
const repo = context.repo;

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

  let highestReviewedCommitId = '';

  const incrementalDiff = await octokit.request(
    'GET /repos/{owner}/{repo}/compare/{base}...{head}',
    {
      owner: repo.owner,
      repo: repo.repo,
      base: highestReviewedCommitId,
      head: context.payload.pull_request?.head.sha,
    }
  );

  // Fetch the diff between the target branch's base commit and the latest commit of the PR branch
  const targetBranchDiff = await octokit.request(
    'GET /repos/{owner}/{repo}/compare/{base}...{head}',
    {
      owner: repo.owner,
      repo: repo.repo,
      base: context.payload.pull_request?.base.sha,
      head: context.payload.pull_request?.head.sha,
    }
  );

  const incrementalFiles = incrementalDiff.data.files;
  const targetBranchFiles = targetBranchDiff.data.files;

  console.log({ incrementalFiles, targetBranchFiles });

  return new Response(null, {
    status: 200,
  });
}
