"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsS3Factory = exports.AwsS3 = void 0;
require("dotenv/config");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
const make_error_request_response_1 = require("../../factories/make-error-request-response");
const configAws = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
};
class AwsS3 {
    constructor() {
        if (!this.connection) {
            aws_sdk_1.config.update(configAws);
            this.connection = new aws_sdk_1.S3(aws_sdk_1.config);
        }
    }
    async upload(dataUpload, folder, extension = 'png', contentType = 'image/png', s3BucketName = 'bayhero-logs-functional') {
        let buffer;
        if (dataUpload instanceof Buffer) {
            buffer = dataUpload;
        }
        else {
            try {
                buffer = Buffer.from(dataUpload.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            }
            catch (error) {
                buffer = Buffer.from(dataUpload, 'base64');
            }
        }
        try {
            const result = await this.connection.upload({
                Bucket: s3BucketName,
                Body: buffer,
                ContentEncoding: 'base64',
                ContentType: contentType,
                Key: `${folder}/${(0, uuid_1.v4)()}.${extension}`,
                ACL: 'public-read'
            }).promise();
            return result;
        }
        catch (error) {
            return (0, make_error_request_response_1.MakeErrorRequestResponseV2)('common/aws/s3', 'upload', __filename, error);
        }
    }
    async delete(key, s3BucketName = 'bayhero-logs-functional') {
        try {
            let result = null;
            result = await this.connection.deleteObject({
                Bucket: s3BucketName,
                Key: key
            }).promise();
            return result;
        }
        catch (error) {
        }
    }
}
exports.AwsS3 = AwsS3;
exports.awsS3Factory = {
    provide: 'AWS_S3',
    useFactory: () => {
        return new AwsS3();
    }
};
//# sourceMappingURL=s3.js.map