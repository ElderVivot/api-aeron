// import path from 'path'
import pem from 'pem'
import util from 'util'

import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'

import { ICertInfoAdapter } from './cert-info.adapter'
import { ICertInfo, IPkcs12ReadResult } from './interfaces-cert'

const readPkcs12Async = util.promisify(
    (bufferOrPath: string | Buffer, options: pem.Pkcs12ReadOptions, cb: pem.Callback<pem.Pkcs12ReadResult>) => pem.readPkcs12(
        bufferOrPath, options, (err, result) => cb(err, result)
    )
)
const readCertInfoAsyn = util.promisify(
    (certificate: string, cb: pem.Callback<ICertInfo>) => pem.readCertificateInfo(
        certificate, (err, result: ICertInfo) => cb(err, result)
    )
)

export class CertInfoImplementation implements ICertInfoAdapter {
    private certInfo: ICertInfo

    constructor (private readonly file: Express.Multer.File, private readonly password: string) { }

    private getIfECpfCnpj (): void {
        try {
            const organizationUnit = Array.from(this.certInfo.organizationUnit)
            if (organizationUnit.length > 0) {
                const eCpfOrCnpj = organizationUnit.filter(text => text.toUpperCase().indexOf('CPF') >= 0 || text.toUpperCase().indexOf('CNPJ') >= 0)
                if (!eCpfOrCnpj || eCpfOrCnpj.length === 0) this.certInfo.eCpfOrCnpj = 'eCNPJ'
                else if (eCpfOrCnpj[0].indexOf('CPF') >= 0) this.certInfo.eCpfOrCnpj = 'eCPF'
                else this.certInfo.eCpfOrCnpj = 'eCNPJ'
            }
        } catch (error) {
            this.certInfo.eCpfOrCnpj = 'eCNPJ'
        }
    }

    private getNameCertAndFederalRegistration (): void {
        const commonName = this.certInfo.commonName.split(':')
        this.certInfo.nameCert = commonName[0]
        this.certInfo.federalRegistration = commonName[1]
    }

    async readPkcs12 (): Promise<IPkcs12ReadResult | ErrorRequestResponse> {
        try {
            return await readPkcs12Async(this.file.buffer, { p12Password: this.password })
        } catch (error) {
            if (error.toString().indexOf('invalid password') >= 0) {
                return MakeErrorRequestResponseV2('common/adapters/cert-info', 'readPkcs12', __filename, 'Invalid password certificate')
            }
            return MakeErrorRequestResponseV2('common/adapters/cert-info', 'readPkcs12', __filename, error)
        }
    }

    async readCertificateInfo (): Promise<ICertInfo | ErrorRequestResponse> {
        try {
            const certPkcs12 = await this.readPkcs12()
            if (certPkcs12 instanceof ErrorRequestResponse) throw certPkcs12

            const certInfoCert = await readCertInfoAsyn(certPkcs12.cert)
            if (certPkcs12.ca.length === 0 || certInfoCert.commonName.indexOf(':') >= 0) this.certInfo = certInfoCert
            else {
                for (const ca of certPkcs12.ca) {
                    const certInfoCA = await readCertInfoAsyn(ca)
                    if (Array.from(certInfoCA?.organizationUnit).length > 0 && certInfoCA.commonName.indexOf(':') >= 0) {
                        this.certInfo = certInfoCA
                        break
                    }
                }
            }

            this.getIfECpfCnpj()
            this.getNameCertAndFederalRegistration()

            return this.certInfo
        } catch (error) {
            return MakeErrorRequestResponseV2('common/adapters/cert-info', 'readCertificateInfo', __filename, error)
        }
    }
}

// const certInfoImplementation = new CertInfoImplementation(path.join(__dirname, '../../../../data/certificate.pfx'), 'password')
// certInfoImplementation.readCertificateInfo().then(_ => console.log(_)).catch(_ => console.log(_))