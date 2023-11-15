import 'dotenv/config'
import { config as config1, S3, ConfigurationOptions } from 'aws-sdk'
import { v4 as uuid } from 'uuid'

import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'

const configAws: ConfigurationOptions = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
}

export type IUploadAwsS3 = S3.ManagedUpload.SendData
export type IDeleteAwsS3 = S3.DeleteObjectOutput

export class AwsS3 {
    private connection: S3
    constructor () {
        if (!this.connection) {
            config1.update(configAws)
            this.connection = new S3(config1)
        }
    }

    async upload (dataUpload: Buffer | string, folder: string, extension: string = 'png', contentType: string = 'image/png', s3BucketName = 'bayhero-logs-functional'): Promise<IUploadAwsS3 | ErrorRequestResponse> {
        let buffer: Buffer
        if (dataUpload instanceof Buffer) {
            buffer = dataUpload
        } else {
            try {
                buffer = Buffer.from(dataUpload.replace(/^data:image\/\w+;base64,/, ''), 'base64')
            } catch (error) {
                buffer = Buffer.from(dataUpload, 'base64')
            }
        }

        try {
            const result = await this.connection.upload({
                Bucket: s3BucketName,
                Body: buffer,
                ContentEncoding: 'base64',
                ContentType: contentType,
                Key: `${folder}/${uuid()}.${extension}`,
                ACL: 'public-read'
            }).promise()
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('common/aws/s3', 'upload', __filename, error)
        }
    }

    async delete (key: string, s3BucketName = 'bayhero-logs-functional'): Promise<IDeleteAwsS3 | ErrorRequestResponse> {
        try {
            let result = null
            result = await this.connection.deleteObject({
                Bucket: s3BucketName,
                Key: key
            }).promise()

            return result
        } catch (error) {
            // return MakeErrorRequestResponseV2('common/aws/s3', 'delete', __filename, error)
        }
    }
}

export const awsS3Factory = {
    provide: 'AWS_S3',
    useFactory: (): AwsS3 => {
        return new AwsS3()
    }
}