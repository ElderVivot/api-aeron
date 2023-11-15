export declare class ExecuteMigrations {
    private connection;
    private clients;
    constructor();
    private insertDataInMigrations;
    private checkIfMigragionAlreadyExecuted;
    private executeMigrations;
    private getListOfClients;
    private migrationsSchemaPublic;
    private migrationsSchemaTenants;
    process(): Promise<void>;
}
