import { Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import * as rd from '@duckdb/react-duckdb';
import { Shell } from './Shell';
import { Form } from './Form';

import { runQueryDuckDb } from '../api/runQueryDuckDb';
import datasets from '../data/remote_datasets.json';

const INITIAL_DATASETS = ['cpv_geo_ageb'];

interface Props {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    minWidth: number;
}

export const Drawer = ({ collapsed, setCollapsed, minWidth }: Props) => {
    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    const db = rd.useDuckDB();

    React.useEffect(() => {
        async function preloadData() {
            Object.entries(datasets).forEach(async dataset => {
                const [key, value] = dataset;
                if (INITIAL_DATASETS.includes(key)) {
                    await runQueryDuckDb(db, `CREATE TABLE IF NOT EXISTS ${key} AS SELECT * FROM '${value}'; `);
                }
            });
        }
        preloadData();
    });

    return (
        <VStack
            height="100%"
            min-height={minWidth}
            spacing={2}
            flex="2"
            width="100%"
            display="block"
            overflowY="clip"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
        >
            <HStack
                height={minWidth}
                minHeight={minWidth}
                width="100%"
                justify="right"
                padding={5}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-start"
            >
                <Form />
                <Button onClick={handleToggleCollapse} colorScheme="teal" variant="outline">
                    Shell
                </Button>
            </HStack>
            <Shell />
        </VStack>
    );
};
