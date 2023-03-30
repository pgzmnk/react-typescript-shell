/* eslint-disable no-case-declarations */
import React, { useState } from 'react';
import { Input, HStack } from '@chakra-ui/react';

import type {
    DatasetCreationProps,
    AddDatasetOptions,
    LayerUpdateProps,
    LayerType,
    LayerConfig,
    LayerCreationProps,
} from '@unfolded/map-sdk/';
import * as rd from '@duckdb/react-duckdb';
import { MapContext } from './Map';
import type { MapContextType } from './Map';
import { runQueryDuckDb } from '../api/runQueryDuckDb';

export const Form = () => {
    const [prompt, setPrompt] = useState(
        'CREATE DATASET cpv_geo_ageb AS SELECT PROM_HNV, geometry_str FROM cpv_geo_ageb WHERE cve_ent=1;',
    );

    const { map } = React.useContext(MapContext) as MapContextType;
    const db = rd.useDuckDB();

    const handlePromptChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        console.log('handleChange...');
        setPrompt(event.target.value);
    };

    const handlePromptSubmission = async (event: any) => {
        // when user presses enter on the input field
        if (event.keyCode === 13) {
            const command = event.target.value.split(' ')[0].toLowerCase() as string;

            // extract prompt fields
            const firstFieldName = event.target.value.match(/\b(SELECT)\s+\`?(\w+)\`?/g)?.[0].split(' ')[1];
            const datasetName = event.target.value.match(/\b(DATASET)\s+\`?(\w+)\`?/g)?.[0].split(' ')[1];

            const addDatasetOptions: AddDatasetOptions = {
                autoCreateLayers: false,
                centerMap: true,
            };

            switch (command) {
                case 'create' || 'update':
                    const queryString = `SELECT ${event.target.value.split(' AS SELECT')[1].trim()} `;

                    const result = await runQueryDuckDb(db, queryString);

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

                    // try to create layer
                    const layerId = 'test-layer-01';
                    const layerCreationProps: LayerCreationProps = {
                        id: layerId,
                        type: 'geojson' as LayerType,
                        dataId: datasetName,
                        label: 'New Layer',
                        isVisible: true,
                        fields: { geojson: 'geometry_str' },
                        config: {
                            visualChannels: {
                                colorField: {
                                    name: firstFieldName,
                                    type: 'real',
                                },
                                colorScale: 'quantile',
                                strokeColorField: {
                                    name: 'value',
                                    type: 'real',
                                },
                                strokeColorScale: 'quantile',
                                sizeField: null,
                                sizeScale: 'linear',
                                heightField: null,
                                heightScale: 'linear',
                                radiusField: null,
                                radiusScale: 'linear',
                                radius: '10',
                            },
                            visConfig: {
                                opacity: 0.8,
                                strokeOpacity: 0.8,
                                thickness: 0.5,
                                strokeColor: null,
                                colorRange: {
                                    name: 'Global Warming',
                                    type: 'sequential',
                                    category: 'Uber',
                                    colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300'],
                                },
                                strokeColorRange: {
                                    name: 'Global Warming',
                                    type: 'sequential',
                                    category: 'Uber',
                                    colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300'],
                                },
                                radius: 10,
                                sizeRange: [0, 10],
                                radiusRange: [0, 50],
                                heightRange: [0, 500],
                                elevationScale: 5,
                                stroked: true,
                                filled: true,
                                enable3d: false,
                                wireframe: false,
                                fixedHeight: false,
                            },
                        },
                    };
                    console.log('layerCreationProps', layerCreationProps);
                    try {
                        map?.addLayer(layerCreationProps);
                    } catch (e) {
                        console.log(e);
                        map?.updateLayer(layerId, layerCreationProps);
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
