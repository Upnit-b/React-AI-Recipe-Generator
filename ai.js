//import { InferenceClient } from '@huggingface/inference'
import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `
  You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(', ')

  const msg = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
      },
    ],
  })
  return msg.content[0].text
}

// const client = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN)

// export async function getRecipeFromMistral(ingredientsArr) {
//   const ingredientsString = ingredientsArr.join(', ')

//   try {
//     const response = await client.chatCompletion({
//       provider: 'hf-inference',
//       model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
//       messages: [
//         { role: 'system', content: SYSTEM_PROMPT },
//         {
//           role: 'user',
//           content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make with these ingredients and do not write Sure I'd be happy to help in the response!`,
//         },
//       ],
//       max_tokens: 10240,
//     })
//     return response.choices[0].message.content
//   } catch (err) {
//     console.error(err.message)
//   }
// }
