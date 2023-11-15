import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '../../../common/interfaces/delete-result';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { AddUserDto } from './dto/add-user.dto';
import { CreateOrUpdateClientDto } from './dto/create-or-update-client.dto';
import { GetClientFilterDto } from './dto/get-client-filter.dto';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    index(filterDto: GetClientFilterDto): Promise<Client[] | ErrorRequestResponse>;
    show(id: string): Promise<Client | ErrorRequestResponse>;
    store(createOrUpdateClientDto: CreateOrUpdateClientDto): Promise<Pick<Client, 'idClient'> | ErrorRequestResponse>;
    destroy(id: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(id: string, createOrUpdateClientDto: CreateOrUpdateClientDto): Promise<Client | ErrorRequestResponse>;
    addUsers(id: string, addUsersDto: AddUserDto): Promise<void | ErrorRequestResponse>;
}
