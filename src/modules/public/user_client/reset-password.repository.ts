import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { MakeResultGenericResponse } from '@common/factories/make-result-generic-response'
import { IResultGenericResponse } from '@common/interfaces/result-generic-response'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { ResetPassword } from './reset-password.entity'

export class ResetPasswordRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async showResetPasswordNotUsed (idResetPassword: string): Promise<ResetPassword | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT user_client_reset_password.*
                FROM public.user_client_reset_password AS user_client_reset_password                     
                WHERE "idResetPassword" = $<idResetPassword>
                  AND "used" = false
                ORDER BY "createdAt" DESC
            `

            const result = await this.connection.query(sql, { idResetPassword })
            if (!result || result.length === 0) {
                throw new NotFoundException(`UserClientResetPassword with ID ${idResetPassword} not found`)
            }
            const resetPassword: ResetPassword = result[0]

            return resetPassword
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'show', __filename, error)
        }
    }

    async sendInformationToResetPassword (userResetPassword: ResetPassword): Promise<Pick<ResetPassword, 'idResetPassword'> | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO public.user_client_reset_password("idResetPassword", "used", "idUser")
                VALUES ($<idResetPassword>, $<used>, $<idUser>)
                RETURNING "idResetPassword"
            `

            const result = await this.connection.one(sql, { ...userResetPassword })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client_reset_password', 'sendInformationToResetPassword', __filename, error)
        }
    }

    async resetPassword (idResetPassword: string): Promise<IResultGenericResponse | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE public.user_client_reset_password 
                SET "used" = true
                WHERE "idResetPassword" = $<idResetPassword>
            `

            const result = await this.connection.result(sql, { idResetPassword })
            if (result.rowCount) {
                return MakeResultGenericResponse('Password update with success', 201)
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'resetPassword', __filename, error)
        }
    }
}