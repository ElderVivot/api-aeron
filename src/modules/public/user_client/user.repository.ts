
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { Connection } from '@database/connection'
import { NotFoundException, Inject } from '@nestjs/common'

import { GetUserDto } from './dto/get-user.dto'
import { ShowUserDto } from './dto/show-user.dto'
import { IUser } from './interfaces/user'
import { IUserList } from './interfaces/user-list'
import { UserClientPermissions } from './user-permissions.entity'
import { User } from './user.entity'

export class UserRepository {
    constructor (@Inject('CONNECTION') private connection: Connection) { }

    async index (idClient: string, getUserDto: GetUserDto): Promise<IUserList[] | ErrorRequestResponse> {
        try {
            const { name, email, username, phone, active } = getUserDto
            let sql = `
                SELECT "user".*, '' AS password
                  FROM "user_client" AS "user"
                       INNER JOIN "client_x_user_client" AS "client_x_user"
                            ON    "client_x_user"."idUser" = "user"."idUser"
                 WHERE "client_x_user"."idClient" = $<idClient>
            `
            if (name) sql = sql + 'AND "user"."name" LIKE \'%\' || $<name> || \'%\''
            if (username) sql = sql + 'AND "user"."username" LIKE \'%\' || $<username> || \'%\''
            if (email) sql = sql + 'AND "user"."email" LIKE \'%\' || $<email> || \'%\''
            if (phone) sql = sql + 'AND "user"."phone" LIKE \'%\' || $<phone> || \'%\''

            if (active && active === 'true') sql = sql + 'AND "user"."active" IS TRUE'
            if (active && active === 'false') sql = sql + 'AND "user"."active" IS FALSE'

            const result = await this.connection.query(sql, { idClient, ...getUserDto })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'index', __filename, error)
        }
    }

    async getUserPermissions (idUser: string): Promise<UserClientPermissions[] | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT *
                  FROM "user_client_permissions" AS "user"
                 WHERE "user"."idUser" = $<idUser>
            `

            const result = await this.connection.query(sql, { idUser })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'getUserPermissions', __filename, error)
        }
    }

    async getListUsername (username: string): Promise<string[] | ErrorRequestResponse> {
        try {
            const sql = `
                SELECT "user"."username"
                  FROM "user_client" AS "user"
                 WHERE "user"."username" LIKE $<username> || '%'
            `

            const result: {username: string}[] = await this.connection.query(sql, { username })

            const listUsers = []
            for (const user of result) {
                listUsers.push(user.username)
            }
            return listUsers
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'getListUsername', __filename, error)
        }
    }

    async show (dto: ShowUserDto): Promise<User | ErrorRequestResponse> {
        const { idUser, username } = dto
        try {
            let sql = `
                SELECT user_client.*
                FROM public.user_client AS user_client                     
                WHERE "idUser" IS NOT NULL
            `
            if (!idUser && !username) throw new Error('Its necessary to inform idUser or username')

            if (idUser) sql = sql + 'AND "idUser" = $<idUser>'
            if (username) sql = sql + '\n AND "username" = $<username>'

            const result = await this.connection.query(sql, { idUser, username })
            if (!result || result.length === 0) {
                if (idUser) throw new NotFoundException(`UserClient with ID ${idUser} not found`)
                if (username) throw new NotFoundException(`UserClient with username ${username} not found`)
            }
            const user: User = result[0]

            return user
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'show', __filename, error)
        }
    }

    async store (user: User): Promise<User | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO public.user_client("idUser", "username", "active", "password", "email", "name", "nickName", "dddPhone", "phone",
                            "departaments", "isUserMain", "tenantQueroConhecer" )
                VALUES ($<idUser>, $<username>, $<active>, $<password>, $<email>, $<name>, $<nickName>, $<dddPhone>, $<phone>,
                        $<departaments>, $<isUserMain>, $<tenantQueroConhecer> )
                RETURNING *
            `

            const result = await this.connection.one(sql, { ...user })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'store', __filename, error)
        }
    }

    async addPermissions (user: UserClientPermissions): Promise<UserClientPermissions | ErrorRequestResponse> {
        try {
            const sql = `
                INSERT INTO public.user_client_permissions("idUserPermissions", "idUser", "createdAt", "updatedAt", "functionality", "permissions")
                VALUES ($<idUserPermissions>, $<idUser>, $<createdAt>, $<updatedAt>, $<functionality>, $<permissions>)
                RETURNING *
            `

            const result: UserClientPermissions = await this.connection.one(sql, { ...user })
            return result
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'addPermissions', __filename, error)
        }
    }

    async updatePermissions (user: UserClientPermissions): Promise<null | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE public.user_client_permissions 
                SET "updatedAt" = $<updatedAt>, "functionality" = $<functionality>, "permissions" = $<permissions>
                WHERE "idUser" = $<idUser>
                  AND "idUserPermissions" = $<idUserPermissions>
            `

            await this.connection.result(sql, { ...user })
            return null
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'addPermissions', __filename, error)
        }
    }

    async confirmRegistration (idUser: string, user: User): Promise<IUser | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE public.user_client 
                SET "name" = $<name>, "password" = $<password>, "nickName" = $<nickName>, "dddPhone" = $<dddPhone>,
                    "phone" = $<phone>, "active" = $<active>, "confirmedRegistration" = $<confirmedRegistration>
                WHERE "idUser" = $<idUser>
            `
            const result = await this.connection.result(sql, { ...user })
            if (result.rowCount) {
                return this.show({ idUser })
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'confirmRegistration', __filename, error)
        }
    }

    async update (idUser: string, user: User): Promise<IUser | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE public.user_client 
                SET "updatedAt" = $<updatedAt>, "name" = $<name>, "nickName" = $<nickName>, "dddPhone" = $<dddPhone>, "email" = $<email>,
                    "phone" = $<phone>, "active" = $<active>, "isUserMain" = $<isUserMain>, "departaments" = $<departaments>
                WHERE "idUser" = $<idUser>
            `
            const result = await this.connection.result(sql, { ...user })
            if (result.rowCount) {
                return this.show({ idUser })
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'update', __filename, error)
        }
    }

    async delete (idUser: string): Promise<string | ErrorRequestResponse> {
        try {
            const sql = `
                DELETE FROM public.user_client 
                WHERE "idUser" = $<idUser>
            `
            const result = await this.connection.result(sql, { idUser })
            if (result.rowCount) {
                return 'deleted success'
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'delete', __filename, error)
        }
    }

    async updatePassword (idUser: string, password: string): Promise<IUser | ErrorRequestResponse> {
        try {
            const sql = `
                UPDATE public.user_client 
                SET "password" = $<password>
                WHERE "idUser" = $<idUser>
            `
            const result = await this.connection.result(sql, { idUser, password })
            if (result.rowCount) {
                return this.show({ idUser })
            }
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'updatePassword', __filename, error)
        }
    }
}