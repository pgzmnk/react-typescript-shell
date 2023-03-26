/* eslint-disable no-case-declarations */
import React, { useState } from 'react';
import { Button, Input, HStack } from '@chakra-ui/react';

import type { DatasetCreationProps, AddDatasetOptions } from '@unfolded/map-sdk/';
import { MapContext } from './Map';
import type { MapContextType } from './Map';
import { runQueryDuckDb } from '../api/runQueryDuckDb';

export const Form = () => {
    const [prompt, setPrompt] = useState('CREATE DATASET city_dataset AS SELECT * FROM city WHERE popRank < 2;');

    const { map } = React.useContext(MapContext) as MapContextType;

    const handlePromptChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        console.log('handleChange...');
        setPrompt(event.target.value);
    };

    const handlePromptSubmission = async (event: any) => {
        // when user presses enter on the input field
        if (event.keyCode === 13) {
            const command = event.target.value.split(' ')[0].toLowerCase() as string;

            // extract prompt fields
            const datasetName = event.target.value.match(/\b(DATASET)\s+\`?(\w+)\`?/g)?.[0].split(' ')[1];

            const addDatasetOptions: AddDatasetOptions = {
                autoCreateLayers: true,
                centerMap: true,
            };

            switch (command) {
                case 'create' || 'update':
                    const queryString = `SELECT ${event.target.value.split(' AS SELECT')[1].trim()} `;

                    const result = await runQueryDuckDb(queryString);

                    const datasetCreationProps: DatasetCreationProps = {
                        id: datasetName,
                        label: datasetName,
                        color: [194, 29, 29],
                        data: JSON.parse(result),
                    };

                    // create or replace dataset
                    try {
                        map?.addDataset(datasetCreationProps, addDatasetOptions);
                    } catch (e) {
                        map?.replaceDataset(datasetCreationProps?.id as string, datasetCreationProps);
                    }

                    break;

                case 'delete':
                    map?.removeDataset(datasetName);
                    break;

                case 'prompt':
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <HStack width="100%">
            <Input
                variant="outline"
                htmlSize={4}
                width="100%"
                id="prompt"
                type="text"
                name="prompt"
                value={prompt}
                onKeyDown={handlePromptSubmission}
                onChange={handlePromptChange}
            />
        </HStack>
    );
};
