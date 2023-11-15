/// <reference types="node" />
import 'dotenv/config';
import { S3 } from 'aws-sdk';
import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
export declare type IUploadAwsS3 = S3.ManagedUpload.SendData;
export declare type IDeleteAwsS3 = S3.DeleteObjectOutput;
export declare class AwsS3 {
    private connection;
    constructor();
    upload(dataUpload: Buffer | string, folder: string, extension?: string, contentType?: string, s3BucketName?: string): Promise<IUploadAwsS3 | ErrorRequestResponse>;
    delete(key: string, s3BucketName?: string): Promise<IDeleteAwsS3 | ErrorRequestResponse>;
}
export declare const awsS3Factory: {
    provide: string;
    useFactory: () => AwsS3;
};
