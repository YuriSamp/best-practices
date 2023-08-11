import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export const gptAnalysisResult = async (prBody: string, rules: string[]) => {
  const stringRules = rules.toString()
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [
        {
          role: 'user',
          content: `You will act as a high-level code reviewer, you must analyze whether the code follows the ${stringRules},
           you must generate a response using markdown containing four sections: Suggestions for Improvement, Breaking Principle , What code break the Principle, Which rules is using,
            If there is no suggestion, write “Everything's fine  👍". Keep it short, use bullet point, write in markdown. here is the code ${prBody}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    })

    if (!response.data.choices[0].message) {
      throw Error('Fail on Get gpt analysis')
    }

    return response.data.choices[0].message.content
  } catch (error) {
    console.log(error)
  }
}
