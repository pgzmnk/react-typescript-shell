import React from 'react';
import * as rd from '@duckdb/react-duckdb';
import arrow from 'apache-arrow';

export const Form: React.FC = () => {
    const db = rd.useDuckDB();

    const handleClick = async () => {
        const c = await db!.value!.connect();
        await c.query(`
            CREATE TABLE from_map AS
                SELECT * FROM 'https://shell.duckdb.org/data/tpch/0_01/parquet/orders.parquet' LIMIT 10;
        `);
        await c.close();
    };

    const handleClickRender = async () => {
        const c = await db!.value!.connect();
        const result = await c.query<{ v: arrow.Int }>('SELECT * FROM from_map LIMIT 4;');
        console.log(result.toString());
        await c.close();
    };

    return (
        <div>
            <button type="button" className="btn btn-secondary" onClick={handleClick}>
                Load
            </button>
            <button type="button" className="btn-btn-secondary" onClick={handleClickRender}>
                Render
            </button>
        </div>
    );
};
