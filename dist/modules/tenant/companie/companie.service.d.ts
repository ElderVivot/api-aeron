import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { IDeleteResult } from '@common/interfaces/delete-result';
import { CityRepository } from '@modules/public/city/city.repository';
import { Companie } from './companie.entity';
import { CompanieRepository } from './companie.repository';
import { CreateOrUpdateDto } from './dto/create-or-update.dto';
import { FilterDto } from './dto/filter.dto';
export declare class CompanieService {
    private repository;
    private cityRepository;
    private dateImplementation;
    constructor(repository: CompanieRepository, cityRepository: CityRepository);
    private getIdCity;
    private getIdCompanie;
    index(dto: FilterDto, tenant: string): Promise<{
        data: Companie[];
        count: string;
    } | ErrorRequestResponse>;
    indexOnlyIDCompanie(dto: FilterDto, tenant: string): Promise<{
        data: {
            listIdCompanie: string;
        };
        count: string;
    } | ErrorRequestResponse>;
    show(idCompanie: string, tenant: string): Promise<Companie | ErrorRequestResponse>;
    store(dto: CreateOrUpdateDto, tenant: string): Promise<Pick<Companie, 'idCompanie'> | ErrorRequestResponse>;
    destroy(idCompanie: string, tenant: string): Promise<IDeleteResult | ErrorRequestResponse>;
    update(idCompanie: string, dto: CreateOrUpdateDto, tenant: string): Promise<Companie | ErrorRequestResponse>;
}
