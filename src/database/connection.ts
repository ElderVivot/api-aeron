// import {Pool} from 'pg'
import pgPromise, { IDatabase, IResultExt } from 'pg-promise'
import 'dotenv/config'

const configConnection = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME
}

type IResult = IResultExt
type IQuery = any
type IOne = any

export class Connection {
    private connection: IDatabase<{}>
    constructor () {
        if (!this.connection) {
            this.connection = pgPromise()(configConnection)
        }
    }

    async query (text: string, params: any): Promise<IQuery> {
        // const start = Date.now()
        const result = await this.connection.query(text, params)
        // const duration = Date.now() - start
        // console.log('executed query', { start, duration, text })
        return result
    }

    async one (text: string, params: any): Promise<IOne> {
        // const start = Date.now()
        const result = await this.connection.one(text, params)
        // const duration = Date.now() - start
        // console.log('executed query', { start, duration, text })
        return result
    }

    async result (text: string, params: any): Promise<IResult> {
        // const start = Date.now()
        const result = await this.connection.result(text, params)
        // const duration = Date.now() - start
        // console.log('executed query', { start, duration, text })
        return result
    }
}

export const connectionFactory = {
    provide: 'CONNECTION',
    useFactory: (): Connection => {
        return new Connection()
    }
}