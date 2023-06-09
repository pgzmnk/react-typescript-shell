/* eslint-disable no-case-declarations */
import React, { useState } from 'react';
import { Stack, Button, Input, HStack } from '@chakra-ui/react';

import * as rd from '@duckdb/react-duckdb';
import arrow from 'apache-arrow';
import type { MapApi, DatasetCreationProps, AddDatasetOptions } from '@unfolded/map-sdk/';
import { Map, MapContext } from './Map';
import type { MapContextType } from './Map';

import datasets from '../data/remote_datasets.json';

export const Form = () => {
    const [prompt, setPrompt] = useState('CREATE DATASET city_dataset AS SELECT * FROM city WHERE popRank < 2;');

    const db = rd.useDuckDB();

    const { map } = React.useContext(MapContext) as MapContextType;

    async function runQuery(query: string) {
        let result: string = '';
        try {
            const c = await db!.value!.connect();
            const response = await c.query(query);
            result = response.toString();
        } catch (error) {
            console.log('error: ', error);
        }
        return result;
    }

    const handleClick = async () => {
        Object.entries(datasets).forEach(async dataset => {
            const [key, value] = dataset;
            await runQuery(`CREATE TABLE IF NOT EXISTS ${key} AS SELECT * FROM '${value}'; `);
        });

        await runQuery(
            `CREATE TABLE IF NOT EXISTS demo_city AS SELECT * FROM 'https://open-demo-datasets.s3.us-west-2.amazonaws.com/kepler/cities.csv'; `,
        );
    };

    const handlePromptChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        console.log('handleChange...');
        setPrompt(event.target.value);
    };

    const handlePromptSubmission = async (event: any) => {
        // when user presses enter on the input field
        if (event.keyCode === 13) {
            const command = event.target.value.split(' ')[0].toLowerCase() as string;

            // extract prompt fields
            const tableName = event.target.value.match(/\b(FROM|JOIN)\s+\`?(\w+)\`?/g)?.[0].split(' ')[1];
            const datasetName = event.target.value.match(/\b(DATASET)\s+\`?(\w+)\`?/g)?.[0].split(' ')[1];

            const addDatasetOptions: AddDatasetOptions = {
                autoCreateLayers: true,
                centerMap: true,
            };

            switch (command) {
                case 'create' || 'update':
                    const queryString = `SELECT ${event.target.value.split(' AS SELECT')[1].trim()} `;

                    const result = await runQuery(queryString);

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
        <Stack>
            <HStack>
                <Button onClick={handleClick}>Load</Button>
            </HStack>
            <Input
                variant="outline"
                id="prompt"
                type="text"
                name="prompt"
                value={prompt}
                onKeyDown={handlePromptSubmission}
                onChange={handlePromptChange}
            />
        </Stack>
    );
};
