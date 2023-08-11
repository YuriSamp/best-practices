import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export const gptAnalysisResult = async (prBody: string, rules: string[]) => {
  const stringRules = rules.toString()

  let content = ''
  let tokens = 0
  let openAiError
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-16k',
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

    content = response.data.choices[0].message.content || ''
    tokens = response.data.usage?.total_tokens || 0
  } catch (err) {
    openAiError = err
  }

  return { content, tokens, openAiError }
}

10000 tokens = 15 reais
30000 tokens = 40 reais
70000 tokens = 80 reais 
