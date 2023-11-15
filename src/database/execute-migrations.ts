import { promises as fs } from 'fs'
import path from 'path'
import pgPromise from 'pg-promise'

import { getFiles } from '@common/utils/get-files'

import { Connection } from './connection'

interface IDClient {
    idClient: string
}

export class ExecuteMigrations {
    private connection: Connection
    private clients: IDClient[]
    constructor () {
        this.connection = new Connection()
    }

    private async insertDataInMigrations (schema: string, nameMigration: string, result: pgPromise.IResultExt, typeResult: string) {
        const sql = `
            INSERT INTO public.migrations_executed("createdAt", "schema", "name", "typeResult", "result")
            VALUES ($<createdAt>, $<schema>, $<name>, $<typeResult>, $<result>)
            RETURNING "idMigrationExecuted"
        `
        await this.connection.query(sql, { createdAt: new Date(), schema, name: nameMigration, typeResult, result })
    }

    private async checkIfMigragionAlreadyExecuted (schema: string, nameMigration: string): Promise<boolean> {
        const sql = `
            SELECT *
            FROM public.migrations_executed
            WHERE "name" = $<name>
              AND "schema" = $<schema>
        `
        const migrationAlreadyExecuted = await this.connection.query(sql, { schema, name: nameMigration })
        if (migrationAlreadyExecuted && migrationAlreadyExecuted.length > 0) return true
        else return false
    }

    private async executeMigrations (file: string, tenant: string = ''): Promise<pgPromise.IResultExt> {
        const dataFile = (await fs.readFile(file)).toString()
        const result = await this.connection.result(dataFile, [tenant])
        return result
    }

    private async getListOfClients (): Promise<IDClient[] | null> {
        const sql = `
            SELECT "idClient"
            FROM public.client
            WHERE "idClient" IS NOT NULL
        `
        try {
            const result = await this.connection.query(sql, {})
            return result
        } catch (error) {
            return null
        }
    }

    private async migrationsSchemaPublic (file: string, nameMigration: string) {
        const schema = 'public'
        try {
            if (nameMigration !== '0002-create-tb-migrations') {
                const migrationAlreadyExecuted = await this.checkIfMigragionAlreadyExecuted(schema, nameMigration)
                if (migrationAlreadyExecuted) return null
            }

            const result = await this.executeMigrations(file)

            if (nameMigration !== '0002-create-tb-migrations') {
                await this.insertDataInMigrations(schema, nameMigration, result, 'S')
                console.log('\t-Executed sucess')
            }
        } catch (error) {
            await this.insertDataInMigrations(schema, nameMigration, error, 'E')
            console.log('\t-Error to execute migration')
        }
    }

    private async migrationsSchemaTenants (file: string, nameMigration: string) {
        if (!this.clients || this.clients.length === 0) return null
        for (const client of this.clients) {
            const tenant = client.idClient.substring(0, 15)
            try {
                const migrationAlreadyExecuted = await this.checkIfMigragionAlreadyExecuted(tenant, nameMigration)
                if (migrationAlreadyExecuted) continue
                const result = await this.executeMigrations(file, tenant)
                await this.insertDataInMigrations(tenant, nameMigration, result, 'S')
                console.log('\t-Executed sucess ', tenant)
            } catch (error) {
                await this.insertDataInMigrations(tenant, nameMigration, error, 'E')
                console.log('\t-Error to execute migration ', tenant)
            }
        }
    }

    async process (): Promise<void> {
        this.clients = await this.getListOfClients()

        const fileDatabaseDir = path.join(__dirname, '../../migrations-database')
        const files = await getFiles(fileDatabaseDir)
        for (const file of files) {
            console.log(file)
            const fileSplit = file.split('/')
            const nameMigration = fileSplit[fileSplit.length - 2]
            const nameFile = fileSplit[fileSplit.length - 1]

            if (nameFile === 'down.sql') continue

            if (nameMigration.substring(0, 1) === 't') await this.migrationsSchemaTenants(file, nameMigration)
            else await this.migrationsSchemaPublic(file, nameMigration)
        }
    }
}

const main = new ExecuteMigrations()
main.process().then(_ => console.log(_))