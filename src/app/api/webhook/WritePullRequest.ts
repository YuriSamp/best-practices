import { PullRequestEvent } from '@octokit/webhooks-types';
import { cleanCodeChanges } from './cleanCodeChanges';
import { gptAnalysisResult } from './getAIAnalysisForPRContent';
import { App } from 'octokit';

export async function writePullRequestComment({
  app,
  event,
}: {
  app: App;
  event: PullRequestEvent;
}) {
  try {
    if (event.installation) {
      const octokit = await app.getInstallationOctokit(event.installation.id);
      const pullRequestChanges = await fetch(event.pull_request.diff_url);
      const codeChanges = await pullRequestChanges.text();
      const prChanges = cleanCodeChanges(codeChanges);
      const aiAnalysis = await gptAnalysisResult(prChanges);
      if (aiAnalysis) {
        return octokit.request(
          'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
          {
            owner: event.repository.owner.login,
            repo: event.repository.name,
            issue_number: event.number,
            body: aiAnalysis,
          }
        );
      }
      throw Error('Fail on Get gpt analysis');
    }
    throw Error('Error on get event installation');
  } catch (error: any) {
    console.log(error);
    // return {
    //   statusCode: error.response.status,
    //   body: error.response.data.message,
    // };
  }
}
