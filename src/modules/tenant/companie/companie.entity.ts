import { v4 as uuid } from 'uuid'

import { ETypeFederalRegistration } from '@common/enums/e-type-federal-registration'

import { ECompanieStatus } from './types/e-companie-status'

export class Companie {
    idCompanie: string
    createdAt: Date
    updatedAt: Date
    codeCompanieAccountSystem: string
    name: string
    nickName: string
    typeFederalRegistration: ETypeFederalRegistration
    federalRegistration: string
    stateRegistration: string
    cityRegistration: string
    status: ECompanieStatus
    dddPhone: number
    phone: string
    email: string
    neighborhood: string
    street: string
    zipCode: string
    complement: string
    referency: string
    dateInicialAsCompanie: Date
    dateInicialAsClient: Date
    dateFinalAsClient: Date
    cnaes: string
    taxRegime: '01' | '02' | '03' | '99'
    idCity: number
    employeesActive: number
    employersActive: number
    qtdEventsS1000: number

    constructor () {
        if (!this.idCompanie) {
            this.idCompanie = uuid()
        }
    }
}