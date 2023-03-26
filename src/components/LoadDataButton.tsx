/* eslint-disable no-case-declarations */
import React, { useState } from 'react';
import { Button, Input, HStack } from '@chakra-ui/react';

import * as rd from '@duckdb/react-duckdb';
import type { DatasetCreationProps, AddDatasetOptions } from '@unfolded/map-sdk/';
import { MapContext } from './Map';
import type { MapContextType } from './Map';

import datasets from '../data/remote_datasets.json';
import { runQueryDuckDb } from '../api/runQueryDuckDb';

export const LoadDataButton = () => {
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

    return (
        <HStack width="100%">
            <Button onClick={handleClick}>Load</Button>
        </HStack>
    );
};
