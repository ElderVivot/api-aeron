
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { Connection } from '@database/connection'
import { Inject } from '@nestjs/common'

import { IClientsUserHaveAccess } from './interfaces/user'

export class AuthRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async showClientsUserHaveAccess (username: string): Promise<IClientsUserHaveAccess[] | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT user_client."idUser", user_client."username", client."idClient", client."name", client."federalRegistration", client.status, client.modules
                  FROM user_client
                       INNER JOIN client_x_user_client AS client_x_user
                            ON    client_x_user."idUser" = user_client."idUser"
                       INNER JOIN client
                            ON    client."idClient" = client_x_user."idClient"
                 WHERE user_client."username" = $<username>
                 ORDER BY client.status, client."createdAt"
            `

            const result = await this.connection.query(sql, { username })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'showClientsUserHaveAccess', __filename, error)
        }
    }
}