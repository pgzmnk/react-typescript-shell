import React, { useState } from 'react';
import { Stack, Button, Input } from '@chakra-ui/react';

import * as rd from '@duckdb/react-duckdb';
import arrow from 'apache-arrow';
import type { MapApi, DatasetCreationProps, AddDatasetOptions } from '@unfolded/map-sdk/';

// constant takes in a map and returns a react component
interface FormProps {
    map: MapApi;
}
export const Form: React.FC<FormProps> = props => {
    const [prompt, setPrompt] = useState('SELECT * FROM city WHERE popRank < 2;');

    const db = rd.useDuckDB();
    const { map } = props;

    const handleClick = async () => {
        const c = await db!.value!.connect();
        await c.query(`
            CREATE TABLE IF NOT EXISTS from_map AS
                SELECT * FROM 'https://shell.duckdb.org/data/tpch/0_01/parquet/orders.parquet' LIMIT 10;
        `);

        await c.query(
            `CREATE TABLE IF NOT EXISTS city AS SELECT * FROM 'https://open-demo-datasets.s3.us-west-2.amazonaws.com/kepler/cities.csv';`,
        );

        await c.close();
    };

    const handleClickRender = async () => {
        const c = await db!.value!.connect();
        const result = await c.query<{ v: arrow.Int }>('SELECT * FROM from_map LIMIT 4;');
        console.log(result.toString());
        await c.close();
    };

    const handleClickAddDataset = async () => {
        const c = await db!.value!.connect();
        const result = await c.query(`SELECT * FROM city;`);
        await c.close();

        const addDatasetOptions: AddDatasetOptions = {
            autoCreateLayers: true,
            centerMap: true,
        };
        const datasetCreationProps: DatasetCreationProps = {
            id: 'test-dataset-03',
            label: 'Citiescapes',
            color: [194, 29, 29],
            data: JSON.parse(result.toString()),
        };

        // create or replace dataset
        try {
            // map.addDataset(datasetCreationProps, addDatasetOptions);
        } catch (e) {
            console.log(e);
            // map.replaceDataset(datasetCreationProps?.id as string, datasetCreationProps);
        }
    };

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        console.log('handleChange...');
        setPrompt(event.target.value);
    };

    const handleClickAddSqlDataset = async (event: any) => {
        if (event.keyCode === 13) {
            console.log('PRESSED ENTER');
            const c = await db!.value!.connect();
            const result = await c.query(event.target.value);
            await c.close();

            const addDatasetOptions: AddDatasetOptions = {
                autoCreateLayers: true,
                centerMap: true,
            };
            const datasetCreationProps: DatasetCreationProps = {
                id: 'sql-dataset-01',
                label: 'user-defined',
                color: [194, 29, 29],
                data: JSON.parse(result.toString()),
            };

            // create or replace dataset
            try {
                console.log('added dataset');
                map.addDataset(datasetCreationProps, addDatasetOptions);
            } catch (e) {
                console.log(e);
                map.replaceDataset(datasetCreationProps?.id as string, datasetCreationProps);
                console.log('updated dataset');
            }
        }
    };

    return (
        <Stack>
            <Stack>
                <Button onClick={handleClick}>Load</Button>
                <Button onClick={handleClickRender}>Render</Button>
                <Button onClick={handleClickAddDataset}>Add Dataset</Button>
            </Stack>
            <Input
                variant="outline"
                id="prompt"
                type="text"
                name="prompt"
                value={prompt}
                onKeyDown={handleClickAddSqlDataset}
                onChange={handleChange}
            />
        </Stack>
    );
};
