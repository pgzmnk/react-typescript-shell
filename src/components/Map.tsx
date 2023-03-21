/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { createMap } from '@unfolded/map-sdk';

import '../static/Map.scss';

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
        <div className="App">
            <UnfoldedMap setMap={setMap} />
            <div className="sidemenu">
                <div className="header">
                    <img className="logo-image" alt="company-logo" src="/images/your-company-logo-here.png" />
                </div>
                {!map ? (
                    <div id="loader" />
                ) : (
                    <div id="content">
                        <h2>Demo Application</h2>
                        <span className="subtitle">
                            Built by{' '}
                            <a href="https://docs.unfolded.ai/map-sdk" target="_blank" rel="noreferrer">
                                Unfolded Map SDK
                            </a>
                        </span>
                        <p className="description">
                            Demonstrating the possiblities of customizing Unfolded Studio using the Map SDK with{' '}
                            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                                React.js
                            </a>
                            .
                        </p>
                        <p className="description-small">
                            The Unfolded Map SDK can be used directly in a standard HTML + JavaScript web page using the
                            JavaScript version of the Map SDK. The Map SDK enables you to use Unfolded maps as a
                            controllable UI component.
                        </p>
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
                        <div className="content-section">
                            <span className="section-label">Layer controls</span>
                            <button id="get-layers" onClick={() => loadLayers()}>
                                GET LAYERS
                            </button>
                            <div id="layers-container">
                                {layers.map((layer, index) => (
                                    <div
                                        key={index}
                                        className={`layer ${layer.isVisible ? 'selected' : ''}`}
                                        onClick={() => setLayerVisibilityForId(layer.id)}
                                    >
                                        <div className="layer-preview">
                                            <img src="/images/layer-icon.svg" alt="layer-icon" />
                                        </div>
                                        <div className="layer-description">
                                            <span className="layer-name">{layer.label}</span>
                                            <span className="layer-text">Click to toggle layer visibility</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <details open>
                                <summary>JSON response</summary>
                                <pre id="results">{layerResult}</pre>
                            </details>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
