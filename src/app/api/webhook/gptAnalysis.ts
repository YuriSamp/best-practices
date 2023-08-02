import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const gptAnalysisResult = async (prBody: string) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [
        {
          role: 'user',
          content: `You will act as a high-level code reviewer, you must analyze whether the code follows the clean code, Functional Programing best practices or OOP best practices,
          you must generate a response using markdown containing three sections: Suggestions for Improvement, Breaking Principles and What code break the Principle, Add code examples. keep it short, use bullet point, here is the code: ${prBody}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    return response.data.choices[0].message?.content;
  } catch (error) {
    console.log(error);
  }
};
