import { makeDateImplementation } from '@common/adapters/date/date-factory'
import { DateImplementation } from '@common/adapters/date/date-implementation'
import { MakeErrorRequestResponseV2, ErrorRequestResponse } from '@common/factories/make-error-request-response'
import { IDeleteResult } from '@common/interfaces/delete-result'
import { NotFoundException, Injectable } from '@nestjs/common'

import { CityRepository } from '../city/city.repository'
import { UserRepository } from '../user_client/user.repository'
import { Client } from './client.entity'
import { ClientRepository } from './client.repository'
import { AddUserDto } from './dto/add-user.dto'
import { CreateOrUpdateClientDto } from './dto/create-or-update-client.dto'
import { GetClientFilterDto } from './dto/get-client-filter.dto'
import { EClientStatus } from './enums/e-client-status'

@Injectable()
export class ClientService {
    private dateImplementation: DateImplementation

    constructor (
        private repository: ClientRepository,
        private cityRepository: CityRepository,
        private userRepository: UserRepository
    ) {
        this.dateImplementation = makeDateImplementation()
    }

    private async getIdCity (idIbgeCity: number): Promise<number> {
        const cities = await this.cityRepository.index({ idIbge: idIbgeCity })
        if (cities instanceof ErrorRequestResponse || !cities.length) {
            throw new NotFoundException(`Dont find city with idIbge = ${idIbgeCity}`)
        }
        const city = cities[0]
        return city.id_city
    }

    async index (getClientFilter: GetClientFilterDto): Promise<Client[] | ErrorRequestResponse> {
        try {
            return await this.repository.index(getClientFilter)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'index', __filename, error)
        }
    }

    async show (idClient: string): Promise<Client | ErrorRequestResponse> {
        return await this.repository.show(idClient)
    }

    async store (createOrUpdateClientDto: CreateOrUpdateClientDto): Promise<Pick<Client, 'idClient'> | ErrorRequestResponse> {
        try {
            let client = new Client()
            client.createdAt = new Date()
            client.updatedAt = new Date()
            client = Object.assign(client, createOrUpdateClientDto)
            client.nickName = client.nickName || client.name.split(' ')[0]
            client.dateAsClient = this.dateImplementation.zonedTimeToUtc(client.dateAsClient, 'America/Sao_Paulo')

            client.idCity = await this.getIdCity(createOrUpdateClientDto.idIbgeCity)

            client.status = createOrUpdateClientDto.status || EClientStatus.ACTIVE

            return await this.repository.store(client)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'store', __filename, error)
        }
    }

    async destroy (idClient: string): Promise<IDeleteResult | ErrorRequestResponse> {
        try {
            const client = await this.show(idClient)
            if (client instanceof ErrorRequestResponse) throw client

            return await this.repository.destroy(idClient)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'destroy', __filename, error)
        }
    }

    async update (idClient: string, createOrUpdateClientDto: CreateOrUpdateClientDto): Promise<Client | ErrorRequestResponse> {
        try {
            let client = await this.show(idClient)
            if (client instanceof ErrorRequestResponse) throw client

            client = Object.assign(client, createOrUpdateClientDto)
            client.updatedAt = new Date()

            client.idCity = await this.getIdCity(createOrUpdateClientDto.idIbgeCity)

            await this.repository.update(client)
            return await this.show(idClient)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'update', __filename, error)
        }
    }

    async addUsers (idClient: string, addUsersDto: AddUserDto): Promise<void | ErrorRequestResponse> {
        try {
            const client = await this.show(idClient)
            if (client instanceof ErrorRequestResponse) throw client

            await this.repository.addUsers(idClient, addUsersDto)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.client', 'addUsers', __filename, error)
        }
    }
}