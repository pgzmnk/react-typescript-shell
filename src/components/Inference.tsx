import React from 'react';
import { Configuration, OpenAIApi } from 'openai';

export const Inference: React.FC<any> = () => {
    React.useEffect(() => {
        async function fetchData() {
            console.log('fetching data');
            console.log(process.env.OPENAI_API_KEY);
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: 'Say this is a test',
                max_tokens: 7,
                temperature: 0,
            });
            console.log(response);
            console.log(response.data.choices[0].text);
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state

    return (
        <div className="">
            <h1>Interface</h1>
        </div>
    );
};
