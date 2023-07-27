import { App, Octokit } from 'octokit';
import { cleanCodeChanges } from './cleanCodeChanges';
import { gptAnalysisResult } from './getAIAnalysisForPRContent';

type Payload = {
  pull_request: {
    diff_url: string;
    number: number;
  };
  repository: {
    owner: {
      login: string;
    };
    name: string;
  };
};

type PullRequestOpened = {
  octokit: Octokit;
  payload: Payload;
};

export async function POST(request: Request) {
  console.log(request);
  const appId = process.env.APP_ID as string;
  const secret = process.env.WEBHOOK_SECRET as string;
  const privateKey = process.env.PRIVATE_KEY as string;

  const app = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
  });

  async function handlePullRequestOpened({
    octokit,
    payload,
  }: PullRequestOpened) {
    try {
      const pullRequestChanges = await fetch(payload.pull_request.diff_url);
      const codeChanges = await pullRequestChanges.text();
      const prChanges = cleanCodeChanges(codeChanges);
      const aiAnalysis = await gptAnalysisResult(prChanges);

      if (aiAnalysis) {
        await octokit.request(
          'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
          {
            owner: payload.repository.owner.login,
            repo: payload.repository.name,
            issue_number: payload.pull_request.number,
            body: aiAnalysis,
            headers: {
              'x-github-api-version': '2022-11-28',
            },
          }
        );
        return;
      }
      throw Error('Fail on Get gpt analysis');
    } catch (error: any) {
      if ('response' in error) {
        console.error(
          `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`
        );
        return;
      }
      console.error(error);
    }
  }

  app.webhooks.on('pull_request.opened', handlePullRequestOpened);

  app.webhooks.onError((error) => {
    if (error.name === 'AggregateError') {
      console.error(`Error processing request: ${error.event}`);
    } else {
      console.error(error);
    }
  });
}
