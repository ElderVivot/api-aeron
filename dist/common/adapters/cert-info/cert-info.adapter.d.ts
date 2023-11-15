import { ErrorRequestResponse } from '@common/factories/make-error-request-response';
import { ICertInfo, IPkcs12ReadResult } from './interfaces-cert';
export interface ICertInfoAdapter {
    readPkcs12(): Promise<IPkcs12ReadResult | ErrorRequestResponse>;
    readCertificateInfo(): Promise<ICertInfo | ErrorRequestResponse>;
}
