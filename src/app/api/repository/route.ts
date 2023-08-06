import { NextResponse } from 'next/server';
import { App } from 'octokit';

export async function GET() {
  const appId = process.env.GITHUB_APP_ID as string;
  const secret = process.env.WEBHOOK_SECRET as string;
  //DEV
  const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n') as string;
  //PROD
  // const privateKey = process.env.PRIVATE_KEY as string;

  const app = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
  });

  try {
    const appUsers = await app.octokit.request('GET /app/installations');
    const octokit = await app.getInstallationOctokit(appUsers.data[0].id);
    const repositories = await octokit.request(
      'GET /installation/repositories'
    );
    return NextResponse.json({ repositories });
  } catch (error) {
    console.log(error);
  }
  return new Response(null, {
    status: 500,
  });
}
