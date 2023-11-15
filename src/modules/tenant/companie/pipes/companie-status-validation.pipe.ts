import { BadRequestException, PipeTransform } from '@nestjs/common'

import { ECompanieStatus } from '../types/e-companie-status'

export class ClientStatusValidationPipe implements PipeTransform {
    private readonly allowedStatuses = [...Object.keys(ECompanieStatus)]

    private isStatusValid (status: any) {
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1
    }

    transform (value: any): ECompanieStatus {
        if (!value) {
            throw new BadRequestException("It's necessary pass value for status")
        }
        value = value.toUpperCase()

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`Value for status is invalid: ${value}`)
        }

        return value
    }
}