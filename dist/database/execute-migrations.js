"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteMigrations = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const get_files_1 = require("../common/utils/get-files");
const connection_1 = require("./connection");
class ExecuteMigrations {
    constructor() {
        this.connection = new connection_1.Connection();
    }
    async insertDataInMigrations(schema, nameMigration, result, typeResult) {
        const sql = `
            INSERT INTO public.migrations_executed("createdAt", "schema", "name", "typeResult", "result")
            VALUES ($<createdAt>, $<schema>, $<name>, $<typeResult>, $<result>)
            RETURNING "idMigrationExecuted"
        `;
        await this.connection.query(sql, { createdAt: new Date(), schema, name: nameMigration, typeResult, result });
    }
    async checkIfMigragionAlreadyExecuted(schema, nameMigration) {
        const sql = `
            SELECT *
            FROM public.migrations_executed
            WHERE "name" = $<name>
              AND "schema" = $<schema>
        `;
        const migrationAlreadyExecuted = await this.connection.query(sql, { schema, name: nameMigration });
        if (migrationAlreadyExecuted && migrationAlreadyExecuted.length > 0)
            return true;
        else
            return false;
    }
    async executeMigrations(file, tenant = '') {
        const dataFile = (await fs_1.promises.readFile(file)).toString();
        const result = await this.connection.result(dataFile, [tenant]);
        return result;
    }
    async getListOfClients() {
        const sql = `
            SELECT "idClient"
            FROM public.client
            WHERE "idClient" IS NOT NULL
        `;
        try {
            const result = await this.connection.query(sql, {});
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async migrationsSchemaPublic(file, nameMigration) {
        const schema = 'public';
        try {
            if (nameMigration !== '0002-create-tb-migrations') {
                const migrationAlreadyExecuted = await this.checkIfMigragionAlreadyExecuted(schema, nameMigration);
                if (migrationAlreadyExecuted)
                    return null;
            }
            const result = await this.executeMigrations(file);
            if (nameMigration !== '0002-create-tb-migrations') {
                await this.insertDataInMigrations(schema, nameMigration, result, 'S');
                console.log('\t-Executed sucess');
            }
        }
        catch (error) {
            await this.insertDataInMigrations(schema, nameMigration, error, 'E');
            console.log('\t-Error to execute migration');
        }
    }
    async migrationsSchemaTenants(file, nameMigration) {
        if (!this.clients || this.clients.length === 0)
            return null;
        for (const client of this.clients) {
            const tenant = client.idClient.substring(0, 15);
            try {
                const migrationAlreadyExecuted = await this.checkIfMigragionAlreadyExecuted(tenant, nameMigration);
                if (migrationAlreadyExecuted)
                    continue;
                const result = await this.executeMigrations(file, tenant);
                await this.insertDataInMigrations(tenant, nameMigration, result, 'S');
                console.log('\t-Executed sucess ', tenant);
            }
            catch (error) {
                await this.insertDataInMigrations(tenant, nameMigration, error, 'E');
                console.log('\t-Error to execute migration ', tenant);
            }
        }
    }
    async process() {
        this.clients = await this.getListOfClients();
        const fileDatabaseDir = path_1.default.join(__dirname, '../../migrations-database');
        const files = await (0, get_files_1.getFiles)(fileDatabaseDir);
        for (const file of files) {
            console.log(file);
            const fileSplit = file.split('/');
            const nameMigration = fileSplit[fileSplit.length - 2];
            const nameFile = fileSplit[fileSplit.length - 1];
            if (nameFile === 'down.sql')
                continue;
            if (nameMigration.substring(0, 1) === 't')
                await this.migrationsSchemaTenants(file, nameMigration);
            else
                await this.migrationsSchemaPublic(file, nameMigration);
        }
    }
}
exports.ExecuteMigrations = ExecuteMigrations;
const main = new ExecuteMigrations();
main.process().then(_ => console.log(_));
//# sourceMappingURL=execute-migrations.js.map