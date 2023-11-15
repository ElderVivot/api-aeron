import { v4 as uuid } from 'uuid'

export class UserClientPermissions {
    idUserPermissions: string
    idUser: string
    createdAt?: Date
    updatedAt: Date
    functionality: string
    permissions: string

    constructor () {
        if (!this.idUserPermissions) {
            this.idUserPermissions = uuid()
        }
    }
}