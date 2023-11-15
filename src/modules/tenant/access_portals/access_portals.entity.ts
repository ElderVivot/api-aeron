import { v4 as uuid } from 'uuid'

import { TTypeStatusAccess } from './types/status-access'

export class AccessPortals {
    idAccessPortals: string
    idTypeAccessPortals: string
    createdAt:Date
    updatedAt:Date
    nameAccess: string
    login: string
    password: string
    status: TTypeStatusAccess
    timestampPasswordIncorrect: Date
    passwordDecrypt?: string

    constructor () {
        if (!this.idAccessPortals) {
            this.idAccessPortals = uuid()
        }
    }
}