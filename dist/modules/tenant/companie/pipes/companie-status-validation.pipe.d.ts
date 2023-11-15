import { PipeTransform } from '@nestjs/common';
import { ECompanieStatus } from '../types/e-companie-status';
export declare class ClientStatusValidationPipe implements PipeTransform {
    private readonly allowedStatuses;
    private isStatusValid;
    transform(value: any): ECompanieStatus;
}
