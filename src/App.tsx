import React from 'react';
import './static/App.css';
import 'xterm/css/xterm.css';
import { ChakraProvider, VStack, StackDivider } from '@chakra-ui/react';

import * as duckdb from '@duckdb/duckdb-wasm';
import { DuckDBConnectionProvider, DuckDBPlatform, DuckDBProvider } from '@duckdb/react-duckdb';

import type { MapApi } from '@unfolded/map-sdk/';
import { MapContext } from './components/Map';
import { DUCKDB_BUNDLES } from './utils/duckdb_bundles';
import { PromptContext } from './components/Prompt';
import { MapEditor } from './components/MapEditor';

const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING);

type SomeComponentProps = Record<string, string>;

export const App: React.FC<SomeComponentProps> = () => {
    const [prompt, setPrompt] = React.useState<string>('mvp');
    const [map, setMap] = React.useState<MapApi>();
    const promptValue = React.useMemo(() => ({ prompt, setPrompt }), [prompt]);
    const mapValue = React.useMemo(() => ({ map, setMap }), [map, setMap]);

    return (
        <ChakraProvider>
            <div className="App">
                <DuckDBPlatform logger={logger} bundles={DUCKDB_BUNDLES}>
                    <DuckDBProvider>
                        <DuckDBConnectionProvider>
                            <MapContext.Provider value={mapValue || null}>
                                <PromptContext.Provider value={promptValue}>
                                    <VStack
                                        divider={<StackDivider borderColor="gray.200" />}
                                        spacing={0}
                                        align="stretch"
                                    >
                                        <MapEditor />
                                    </VStack>
                                </PromptContext.Provider>
                            </MapContext.Provider>
                        </DuckDBConnectionProvider>
                    </DuckDBProvider>
                </DuckDBPlatform>
            </div>
        </ChakraProvider>
    );
};
