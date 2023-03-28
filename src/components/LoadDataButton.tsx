/* eslint-disable no-case-declarations */
import React, { useState } from 'react';
import { Button, Input, HStack } from '@chakra-ui/react';

import * as rd from '@duckdb/react-duckdb';
import { MapContext } from './Map';
import type { MapContextType } from './Map';
import { runQueryDuckDb } from '../api/runQueryDuckDb';

import datasets from '../data/remote_datasets.json';

export const LoadDataButton = () => {
    const { map } = React.useContext(MapContext) as MapContextType;
    const db = rd.useDuckDB();

    const handleClick = async () => {
        Object.entries(datasets).forEach(async dataset => {
            const [key, value] = dataset;
            await runQueryDuckDb(db, `CREATE TABLE IF NOT EXISTS ${key} AS SELECT * FROM '${value}'; `);
        });

        await runQueryDuckDb(
            db,
            `CREATE TABLE IF NOT EXISTS demo_city AS SELECT * FROM 'https://open-demo-datasets.s3.us-west-2.amazonaws.com/kepler/cities.csv'; `,
        );
    };

    return (
        <HStack width="100%">
            <Button onClick={handleClick}>Load</Button>
        </HStack>
    );
};
