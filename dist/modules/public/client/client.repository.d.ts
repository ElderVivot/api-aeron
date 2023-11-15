import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { Connection } from '@database/connection';
import { Client } from './client.entity';
import { AddUserDto } from './dto/add-user.dto';
import { GetClientFilterDto } from './dto/get-client-filter.dto';
export declare class ClientRepository {
    private connection;
    constructor(connection: Connection);
    index(getClientFilter: GetClientFilterDto): Promise<Client[] | ErrorRequestResponse>;
    show(idClient: string): Promise<Client | ErrorRequestResponse>;
    store(client: Client): Promise<Pick<Client, 'idClient'> | ErrorRequestResponse>;
    update(client: Client): Promise<void | ErrorRequestResponse>;
    destroy(idClient: string): Promise<IDeleteResult | ErrorRequestResponse>;
    addUsers(idClient: string, addUsersDto: AddUserDto): Promise<void | ErrorRequestResponse>;
}
