import { v4 as uuid } from 'uuid'

import { UserClientPermissions } from './user-permissions.entity'

export class User {
    idUser: string
    createdAt: Date
    updatedAt: Date
    username: string
    password: string
    active: boolean
    confirmedRegistration: boolean
    email: string
    name: string
    nickName: string
    dddPhone: number
    phone: string
    departaments: string
    isUserMain: boolean
    roles?: UserClientPermissions[]
    tenantQueroConhecer?: string

    constructor () {
        if (!this.idUser) {
            this.idUser = uuid()
        }
    }
}