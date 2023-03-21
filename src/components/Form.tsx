import React from 'react';
import * as rd from '@duckdb/react-duckdb';
import arrow from 'apache-arrow';
import type { MapApi } from '@unfolded/map-sdk/';

// constant takes in a map and returns a react component
interface FormProps {
    map: MapApi;
}

export const Form: React.FC<FormProps> = props => {
    const db = rd.useDuckDB();
    const { map } = props;

    const handleClick = async () => {
        const c = await db!.value!.connect();
        await c.query(`
            CREATE TABLE from_map AS
                SELECT * FROM 'https://shell.duckdb.org/data/tpch/0_01/parquet/orders.parquet' LIMIT 10;
        `);
        await c.insertJSONFromPath('data/cities.json', { name: 'rows' });

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
        const result = await c.query(`SELECT * FROM from_map LIMIT 10;`);
        console.log('handleClickAddDataset');
        console.log(result.toString());
        await c.close();
        // eslint-disable-next-line react/destructuring-assignment
        map.addDataset({
            id: 'test-dataset-02',
            label: 'NYC Trips',
            color: [194, 29, 29],
            data: result.toString(),
        });
        // options: {
        //     "autoCreateLayers": true,
        //     "centerMap": true
        // }
    };

    return (
        <div>
            <button type="button" className="btn btn-secondary" onClick={handleClick}>
                Load
            </button>
            <button type="button" className="btn-btn-secondary" onClick={handleClickRender}>
                Render
            </button>
            <button type="button" className="btn-btn-secondary" onClick={handleClickAddDataset}>
                Add Dataset
            </button>
        </div>
    );
};
