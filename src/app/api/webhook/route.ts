import { App } from 'octokit';
import type { PullRequestEvent } from '@octokit/webhooks-types';
import { context as github_context } from '@actions/github';

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

  files.data.forEach((file: any) => {
    console.log(`Arquivo: ${file.filename}`);
    console.log(`Nº de linhas Adicionadas: ${file.additions}`);
    console.log(`Conteúdo adicionado: ${file.patch}`);
    console.log(`Nº de linhas Removidas: ${file.deletions}`);
  });

  // const diffUrl = data.diff_url;
  // const diff = await octokit.request(`GET ${diffUrl}`);
  // const addedLines = diff.data.split(/\r?\n/).filter((line) => line.startsWith("+"));

  // console.log("Linhas adicionadas:");
  // addedLines.forEach((line) => {
  //   console.log(line);
  // });

  return new Response(null, {
    status: 200,
  });
}
