import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { CityRepository } from '../city/city.repository';
import { UserRepository } from '../user_client/user.repository';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';
import { AddUserDto } from './dto/add-user.dto';
import { CreateOrUpdateClientDto } from './dto/create-or-update-client.dto';
import { GetClientFilterDto } from './dto/get-client-filter.dto';
export declare class ClientService {
    private repository;
    private cityRepository;
    private userRepository;
    private dateImplementation;
    constructor(repository: ClientRepository, cityRepository: CityRepository, userRepository: UserRepository);
    private getIdCity;
    index(getClientFilter: GetClientFilterDto): Promise<Client[] | ErrorRequestResponse>;
    show(idClient: string): Promise<Client | ErrorRequestResponse>;
    store(createOrUpdateClientDto: CreateOrUpdateClientDto): Promise<Pick<Client, 'idClient'> | ErrorRequestResponse>;
    destroy(idClient: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(idClient: string, createOrUpdateClientDto: CreateOrUpdateClientDto): Promise<Client | ErrorRequestResponse>;
    addUsers(idClient: string, addUsersDto: AddUserDto): Promise<void | ErrorRequestResponse>;
}
