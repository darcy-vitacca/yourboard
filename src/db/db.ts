import { Pool, PoolClient, PoolConfig } from 'pg';

let _pgPool: any = null

export async function initialiseDatabase (): Promise<void> {
    const poolConfig: PoolConfig = {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PORT)
    }
    try {
        console.log(`Database connected on ${process.env.PORT}`);
        _pgPool = new Pool(poolConfig)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function getDatabase (): Promise<Pool> {
    if (!_pgPool) {
        await initialiseDatabase()
    }
    return _pgPool
}
export const transaction = async (callback: (client: PoolClient) => Promise<any>):
  Promise<number | boolean> => {
    const client: PoolClient = await _pgPool.connect()
    let id = 0
    try {
        await client.query('BEGIN')
        try {
            id = await callback(client)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        }
    } finally {
        client.release()
    }
    return id
}
