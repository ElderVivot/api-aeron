import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { City } from './city.entity';
import { CityService } from './city.service';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { GetFilterDto } from './dto/get-filter.dto';
export declare class CityController {
    private service;
    constructor(service: CityService);
    index(filterDto: GetFilterDto): Promise<City[] | ErrorRequestResponse>;
    show(id: number): Promise<City | ErrorRequestResponse>;
    upsert(createOrUpdateDto: CreateOrUpdateDto): Promise<City | ErrorRequestResponse>;
    destroy(id: number): Promise<IDeleteResult | ErrorRequestResponse>;
    update(id: number, createOrUpdateDto: CreateOrUpdateDto): Promise<City | ErrorRequestResponse>;
}
