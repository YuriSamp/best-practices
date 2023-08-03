import { PullRequestEvent } from '@octokit/webhooks-types';
import { cleanCodeChanges } from './cleanCodeChanges';
import { gptAnalysisResult } from './gptAnalysis';
import { App } from 'octokit';

export async function writePullRequestComment({
  app,
  event,
}: {
  app: App;
  event: PullRequestEvent;
}) {
  try {
    if (!event.installation) {
      throw Error('Error on get event installation');
    }
    const octokit = await app.getInstallationOctokit(event.installation.id);

    const { data } = await octokit.rest.pulls.get({
      owner: event.repository.owner.login,
      repo: event.repository.name,
      pull_number: event.number,
      mediaType: {
        format: 'diff',
      },
    });
    console.log('diff data', JSON.stringify(data));
    const pullRequestChanges = await fetch(event.pull_request.diff_url);
    // console.log({ pullRequestChanges });
    const codeChanges = await pullRequestChanges.text();
    // console.log({ codeChanges });
    const prChanges = cleanCodeChanges(codeChanges);
    const aiAnalysis = await gptAnalysisResult(prChanges);

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
}
