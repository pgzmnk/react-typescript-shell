/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { createMap } from '@unfolded/map-sdk';
import { Form } from './Form';

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
    const [map, setMap] = useState<any>(null);
    const [layers, setLayers] = useState<any[]>([]);
    const [layerResult, setLayerResult] = useState<any>('');

    useEffect(() => {
        const dataset = {
            id: 'test-dataset-01',
            label: 'Cities',
            color: [194, 29, 29],
            data: locationData,
        };

        map && map.addDataset(dataset);
    }, [map]);

    const loadLayers = () => {
        const layers = map!.getLayers();
        setLayerResult(JSON.stringify(layers, null, 2));
        setLayers(layers);
    };

    const setLayerVisibilityForId = (id: any) => {
        const index = layers.findIndex(layer => layer.id === id);
        const layer = layers[index];
        const layerId = layer.id;
        const isVisible = !layer.isVisible;
        layers[index] = map.updateLayer(layerId, { isVisible });
        const newLayers = [...layers];
        setLayers(newLayers);
    };

    const goTo = (location: string) => {
        let viewStateConfig = {
            longitude: 0,
            latitude: 0,
            zoom: 0,
        };
        switch (location) {
            case 'sf':
                viewStateConfig = {
                    longitude: -122.4194,
                    latitude: 37.7749,
                    zoom: 6,
                };
                break;
            case 'la':
                viewStateConfig = {
                    longitude: -118.243683,
                    latitude: 34.052235,
                    zoom: 6,
                };
                break;
            case 'ny':
                viewStateConfig = {
                    longitude: -73.935242,
                    latitude: 40.73061,
                    zoom: 6,
                };
                break;
            case 'london':
                viewStateConfig = {
                    longitude: 0.1276,
                    latitude: 51.5072,
                    zoom: 6,
                };
                break;
            default:
                break;
        }
        _setViewState(viewStateConfig);
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
    const _setViewState = (config: { longitude: number; latitude: number; zoom: number }) => {
        map.setView(config);
    };

    return (
        <div className="">
            <UnfoldedMap setMap={setMap} />
            <div className="sidemenu">
                {!map ? (
                    <div id="loader" />
                ) : (
                    <div id="content">
                        <h2>GeoDuck</h2>
                        <Form />
                        <span className="subtitle">
                            Built by{' '}
                            <a href="https://www.geospatialml.com/" target="_blank" rel="noreferrer">
                                GeospatialML
                            </a>
                        </span>
                        <p className="description-small">Natural language geospatial analysis.</p>
                        <div className="content-section">
                            <span className="section-label">Viewport controls</span>
                            <div className="location-container">
                                <button id="move_button_sf" onClick={() => goTo('sf')}>
                                    San Francisco
                                </button>
                                <button id="move_button_ny" onClick={() => goTo('ny')}>
                                    New York
                                </button>
                                <button id="move_button_la" onClick={() => goTo('la')}>
                                    Los Angeles
                                </button>
                                <button id="move_button_london" onClick={() => goTo('london')}>
                                    London
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
