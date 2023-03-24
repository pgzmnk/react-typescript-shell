import React from 'react';

type Prompt = string;

type PromptContextType = {
    prompt: Prompt;
    setPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
};

export const PromptContext = React.createContext<PromptContextType>({
    prompt: '',
    setPrompt: () => { },
});

export const PromptDisplay = () => {
    const { prompt } = React.useContext(PromptContext) as PromptContextType;
    return <div>{prompt}</div>;
};

export const PromptInput = () => {
    const { prompt, setPrompt } = React.useContext(PromptContext) as PromptContextType;
    const changeHandler = (event: React.FormEvent<HTMLInputElement>): void => setPrompt(event.currentTarget.value);
    return (
        <div>
            <input type="text" value={prompt} onChange={changeHandler} />
        </div>
    );
};
