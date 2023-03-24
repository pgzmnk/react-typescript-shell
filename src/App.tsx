import React from 'react';
import './static/App.css';
import 'xterm/css/xterm.css';
import { ChakraProvider, VStack, StackDivider } from '@chakra-ui/react';

import * as duckdb from '@duckdb/duckdb-wasm';
import { DuckDBConnectionProvider, DuckDBPlatform, DuckDBProvider } from '@duckdb/react-duckdb';

import { ShellSlide } from './components/ShellSlide';
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
                                <VStack divider={<StackDivider borderColor="gray.200" />} spacing={0} align="stretch">
                                    <Map />
                                    <ShellSlide />
                                </VStack>
                            </PromptContext.Provider>
                        </DuckDBConnectionProvider>
                    </DuckDBProvider>
                </DuckDBPlatform>
            </div>
        </ChakraProvider>
    );
};
