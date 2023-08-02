import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const gptAnalysisResult = async (prBody: string) => {
  console.log(prBody);
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [
        {
          role: 'user',
          content: `You will act as a high-level code reviewer, you must analyze whether the code follows the clean code, Functional Programing best practices or OOP best practices, you must generate a response using markdown containing three sections: Suggestions for Improvement, Breaking Principles and What code break the Principle, only if there are suggestion, improvement or coding that breaks this principles. Keep it short, use bullet point, write in markdown. here is the code ${prBody}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    if (!response.data.choices[0].message) {
      throw Error('Fail on Get gpt analysis');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};
