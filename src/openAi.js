import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const prChecker = async (prBody, bestPratices) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0301',
    messages: [
      {
        role: 'user',
        content: `You will act as a high-level code reviewer, you must analyze whether the code follows the best practices ${bestPratices.join(
          ', '
        )},
         you must generate a response using markdown containing two sections: Suggestions for Improvement and Breaking Principles. keep it short, use bullet point, here is the code: ${prBody}`,
      },
    ],
    temperature: 0.1,
    max_tokens: 1000,
  });

  if (response.data.choices[0].message) {
    return response.data.choices[0].message.content;
  }
  return 'teste';
};
