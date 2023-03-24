/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { createMap } from '@unfolded/map-sdk';
import type { MapApi, DatasetCreationProps } from '@unfolded/map-sdk/';
import { Box } from '@chakra-ui/react';

import '../static/map.css';

const locationData = require('../data/cities.json');

// @ts-expect-error
const UnfoldedMap = ({ setMap }) => {
    const mountContainerRef = useRef(null);

    useEffect(() => {
        const loadMap = async () => {
            const mapInstance = await createMap({});

            setMap(mapInstance);
            mapInstance.addToDOM(mountContainerRef?.current!);
        };
        loadMap();
    }, [setMap]);

    return (
        <div className="unfolded">
            <div ref={mountContainerRef} />
        </div>
    );
};

export const Map = () => {
    const [map, setMap] = useState<MapApi>();

    useEffect(() => {
        const dataset: DatasetCreationProps = {
            id: 'test-dataset-01',
            label: 'Cities',
            color: [194, 29, 29],
            data: locationData,
        };

        // disable pre-loading datasets for now
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // map && map.addDataset(dataset);
    }, [map]);

    return (
        <Box w="100%" h="980px">
            <UnfoldedMap setMap={setMap} />
        </Box>
    );
};
