import dotenv from 'dotenv';
import { App } from 'octokit';
import fs from 'fs';
import http from 'http';
import { createNodeMiddleware } from '@octokit/webhooks';
import { diffParser } from './diffParser.js';
import { prChecker } from './openAi.js';

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

async function handlePullRequestOpened({ octokit, payload }) {
  try {
    const request = await fetch(payload.pull_request.diff_url);
    const gitDiff = await request.text();
    const newCode = diffParser(gitDiff);
    const messageForNewPRs = prChecker(newCode);

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
