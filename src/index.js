import dotenv from 'dotenv';
import { App } from 'octokit';
import fs from 'fs';
import http from 'http';
import { createNodeMiddleware } from '@octokit/webhooks';

dotenv.config();

const appId = process.env.APP_ID;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const secret = process.env.WEBHOOK_SECRET;

const app = new App({
  appId,
  privateKey,
  webhooks: {
    secret,
  },
});

const messageForNewPRs =
  'Thanks for opening a new PR! Please follow our contributing guidelines to make your PR easier to review.';

async function handlePullRequestOpened({ octokit, payload }) {
  console.log(
    `Received a pull request event for #${payload.pull_request.number}`
  );
  try {
    await octokit.request(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
      {
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.pull_request.number,
        body: messageForNewPRs,
        headers: {
          'x-github-api-version': '2022-11-28',
        },
      }
    );
    console.log(payload.pull_request.diff_url);
    const gitDiff = fetch(payload.pull_request.diff_url);
    console.log((await gitDiff).json());
  } catch (error) {
    if (error.response) {
      console.error(
        `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`
      );
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

const port = 3000;
const host = 'localhost';
const path = '/api/webhook';
const localWebhookUrl = `http://${host}:${port}${path}`;

const middleware = createNodeMiddleware(app.webhooks, { path });

http.createServer(middleware).listen(port, () => {
  console.log(`Server is listening for events at: ${localWebhookUrl}`);
  console.log('Press Ctrl + C to quit.');
});
