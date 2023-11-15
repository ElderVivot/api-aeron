import { v4 as uuid } from 'uuid'

import { EClientStatus } from './enums/e-client-status'
import { ETypeFederalRegistration } from './enums/e-type-federal-registration'

export class Client {
    idClient: string
    name: string
    createdAt: Date
    updatedAt: Date
    typeFederalRegistration: ETypeFederalRegistration
    federalRegistration: string
    nickName: string
    status: EClientStatus
    neighborhood: string
    street: string
    zipCode: string
    complement: string
    referency: string
    dateAsClient: Date
    idCity: number
    modules?: string

    constructor () {
        if (!this.idClient) {
            this.idClient = uuid()
        }
    }
}