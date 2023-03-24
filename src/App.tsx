import React from 'react';
import './static/App.css';
import 'xterm/css/xterm.css';
import { ChakraProvider } from '@chakra-ui/react';

import * as duckdb from '@duckdb/duckdb-wasm';
import { DuckDBConnectionProvider, DuckDBPlatform, DuckDBProvider } from '@duckdb/react-duckdb';

import { Shell } from './components/Shell';
import { Map } from './components/Map';
import { Inference } from './components/Inference';
import { DUCKDB_BUNDLES } from './utils/duckdb_bundles';
import { PromptContext, PromptDisplay, PromptInput } from './components/Prompt';

const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING);

type SomeComponentProps = Record<string, string>;

export const App: React.FC<SomeComponentProps> = () => {
    const [prompt, setPrompt] = React.useState<string>('mvp');
    const promptValue = React.useMemo(() => ({ prompt, setPrompt }), [prompt]);

    return (
        <ChakraProvider>
            <div className="App">
                <DuckDBPlatform logger={logger} bundles={DUCKDB_BUNDLES}>
                    <DuckDBProvider>
                        <DuckDBConnectionProvider>
                            <PromptContext.Provider value={promptValue}>
                                <Map />
                                <Shell />
                            </PromptContext.Provider>
                        </DuckDBConnectionProvider>
                    </DuckDBProvider>
                </DuckDBPlatform>
            </div>
        </ChakraProvider>
    );
};
