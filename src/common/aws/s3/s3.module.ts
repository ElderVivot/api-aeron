import { Module } from '@nestjs/common'

import { awsS3Factory } from './s3'

@Module({
    providers: [awsS3Factory],
    exports: [awsS3Factory]
})
export class AwsS3Module {}