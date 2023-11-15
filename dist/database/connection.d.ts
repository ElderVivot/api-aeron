import { IResultExt } from 'pg-promise';
import 'dotenv/config';
declare type IResult = IResultExt;
declare type IQuery = any;
declare type IOne = any;
export declare class Connection {
    private connection;
    constructor();
    query(text: string, params: any): Promise<IQuery>;
    one(text: string, params: any): Promise<IOne>;
    result(text: string, params: any): Promise<IResult>;
}
export declare const connectionFactory: {
    provide: string;
    useFactory: () => Connection;
};
export {};
