import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
export declare class ValidationPipeCustom extends ValidationPipe {
    private options?;
    constructor(options?: ValidationPipeOptions);
}
