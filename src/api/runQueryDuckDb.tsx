export async function runQueryDuckDb(db: any, query: string) {
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
