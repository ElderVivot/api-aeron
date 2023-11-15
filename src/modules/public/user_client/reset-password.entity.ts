import { v4 as uuid } from 'uuid'

export class ResetPassword {
    idResetPassword: string

    createdAt: Date

    updatedAt: Date

    used: boolean

    idUser: string

    constructor () {
        if (!this.idResetPassword) {
            this.idResetPassword = uuid()
        }
    }
}