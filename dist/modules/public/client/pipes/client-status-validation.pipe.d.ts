import { PipeTransform } from '@nestjs/common';
import { EClientStatus } from '../enums/e-client-status';
export declare class ClientStatusValidationPipe implements PipeTransform {
    private readonly allowedStatuses;
    private isStatusValid;
    transform(value: any): EClientStatus;
}
