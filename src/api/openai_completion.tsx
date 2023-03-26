// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration, OpenAIApi } from 'openai';

export async function OpenaiCompletion(prompt: string): Promise<string> {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 7,
        temperature: 0,
    });
    return response.data.choices[0].text as string;
}
