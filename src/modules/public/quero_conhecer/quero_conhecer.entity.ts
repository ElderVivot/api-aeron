import { v4 as uuid } from 'uuid'

import { EOccupation } from './enums/e-occupation'

export class QueroConhecer {
    idQueroConhecer: string
    createdAt: Date
    name: string
    email: string
    phone: string
    companie: string
    occupation: EOccupation
    alreadyContactedTheCustomer: string

    constructor () {
        if (!this.idQueroConhecer) {
            this.idQueroConhecer = uuid()
        }
    }
}