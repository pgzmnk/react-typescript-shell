import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';
import duckdb_wasm_coi from '@duckdb/duckdb-wasm/dist/duckdb-coi.wasm';

export const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
    },
    eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
    },
    coi: {
        mainModule: duckdb_wasm_coi,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-coi.worker.js', import.meta.url).toString(),
        pthreadWorker: new URL(
            '@duckdb/duckdb-wasm/dist/duckdb-browser-coi.pthread.worker.js',
            import.meta.url,
        ).toString(),
    },
};
