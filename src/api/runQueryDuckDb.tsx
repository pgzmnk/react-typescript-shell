import * as rd from '@duckdb/react-duckdb';

export async function runQueryDuckDb(query: string) {
    const db = rd.useDuckDB();
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
