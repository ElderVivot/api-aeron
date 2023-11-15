export declare class Migration {
    idMigrationExecuted: number;
    createdAt: Date;
    schema: string;
    name: string;
    typeResult: 'S' | 'E';
    result: string;
}
