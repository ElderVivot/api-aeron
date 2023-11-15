
import { ICryptAdapter, makeCryptImplementation } from '@common/adapters/crypt'
import { makeDateImplementation } from '@common/adapters/date/date-factory'
import { DateImplementation } from '@common/adapters/date/date-implementation'
import { IGeneratePasswordAdapter, makeGeneratePasswordImplementation } from '@common/adapters/generate-hash'
import { ErrorRequestResponse, MakeErrorRequestResponseV2 } from '@common/factories/make-error-request-response'
import { IResultGenericResponse } from '@common/interfaces/result-generic-response'
import { Injectable, NotFoundException } from '@nestjs/common'

import { ClientRepository } from '../client/client.repository'
import { ConfirmRegistrationDto } from './dto/confirm-registration.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import { ResetPasswordDto } from './dto/reset-password'
import { ShowUserDto } from './dto/show-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { IUser } from './interfaces/user'
import { IUserList } from './interfaces/user-list'
import { ResetPassword } from './reset-password.entity'
import { ResetPasswordRepository } from './reset-password.repository'
import { UserClientPermissions } from './user-permissions.entity'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
    private makeGeneratePasswordImplementation: IGeneratePasswordAdapter
    private cryptImplementation: ICryptAdapter
    private dateImplementation: DateImplementation

    constructor (
        private repository: UserRepository,
        private resetPasswordRepository: ResetPasswordRepository,
        private clientRepository: ClientRepository
    ) {
        this.makeGeneratePasswordImplementation = makeGeneratePasswordImplementation()
        this.cryptImplementation = makeCryptImplementation()
        this.dateImplementation = makeDateImplementation()
    }

    async index (idClient: string, getUserDto: GetUserDto): Promise<IUserList[] | ErrorRequestResponse> {
        try {
            const client = await this.clientRepository.show(idClient)
            if (client instanceof ErrorRequestResponse) throw client

            return await this.repository.index(idClient, getUserDto)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'index', __filename, error)
        }
    }

    async getListUsername (username: string): Promise<string[] | ErrorRequestResponse> {
        try {
            const listUsers = await this.repository.getListUsername(username)
            if (listUsers instanceof ErrorRequestResponse) throw listUsers

            return listUsers
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'getListUsername', __filename, error)
        }
    }

    async store (createUserDto: CreateUserDto): Promise<User | ErrorRequestResponse> {
        try {
            const { isUserMain, departaments, dataListPermissions } = createUserDto

            let user = new User()
            user = Object.assign(user, createUserDto)

            const password = this.makeGeneratePasswordImplementation.generatePassword()
            const passwordCrypt = await this.cryptImplementation.hash(password)

            user.password = passwordCrypt
            user.nickName = user.nickName || user.name.split(' ')[0]
            user.active = true
            user.tenantQueroConhecer = user.tenantQueroConhecer || ''

            if (isUserMain) user.isUserMain = true
            else user.isUserMain = false

            if (!departaments) user.departaments = 'folha,fiscal,contabil'
            else user.departaments = departaments

            const userCreated = await this.repository.store(user)
            if (userCreated instanceof ErrorRequestResponse) throw userCreated

            const { idUser } = userCreated

            if (dataListPermissions && dataListPermissions.length > 0) {
                for (const permission of dataListPermissions) {
                    try {
                        let userClientPermissions = new UserClientPermissions()
                        userClientPermissions = Object.assign(userClientPermissions, permission)
                        userClientPermissions.idUser = idUser

                        userClientPermissions.createdAt = new Date()
                        userClientPermissions.updatedAt = userClientPermissions.createdAt

                        await this.repository.addPermissions(userClientPermissions)
                    } catch (error) {
                        await this.repository.delete(idUser)
                        throw error
                    }
                }
            }

            const userPermissions = await this.repository.getUserPermissions(idUser)
            if (userPermissions instanceof ErrorRequestResponse) throw userPermissions

            userCreated.roles = userPermissions

            return userCreated
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'store', __filename, error)
        }
    }

    async show (dto: ShowUserDto): Promise<User | ErrorRequestResponse> {
        const user = await this.repository.show(dto)
        if (user instanceof ErrorRequestResponse) throw user
        user.password = ''

        const userPermissions = await this.repository.getUserPermissions(user.idUser)
        if (userPermissions instanceof ErrorRequestResponse) throw userPermissions

        user.roles = userPermissions

        return user
    }

    async confirmRegistration (id: string, dto: ConfirmRegistrationDto): Promise<IUser | ErrorRequestResponse> {
        try {
            let user = await this.show({ idUser: id })
            if (user instanceof ErrorRequestResponse) throw user

            if (user.confirmedRegistration) {
                throw new Error('User already confirmed registration before')
            }

            user = Object.assign(user, dto)
            const { password } = dto
            const passwordCrypt = await this.cryptImplementation.hash(password)
            user.password = passwordCrypt
            user.confirmedRegistration = true
            user.active = true

            return await this.repository.confirmRegistration(id, user)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'confirmRegistration', __filename, error)
        }
    }

    async update (id: string, dto: UpdateUserDto): Promise<User | ErrorRequestResponse> {
        try {
            const { isUserMain, departaments, dataListPermissions } = dto

            let user = await this.show({ idUser: id })
            if (user instanceof ErrorRequestResponse) throw user

            if (isUserMain) user.isUserMain = true
            if (departaments) user.departaments = departaments

            user = Object.assign(user, dto)
            if (user instanceof ErrorRequestResponse) throw user

            user.updatedAt = new Date()

            await this.repository.update(id, user)

            if (dataListPermissions && dataListPermissions.length > 0) {
                for (const permission of dataListPermissions) {
                    if (permission.idUserPermissions) {
                        await this.repository.updatePermissions({
                            idUserPermissions: permission.idUserPermissions,
                            idUser: id,
                            updatedAt: new Date(),
                            functionality: permission.functionality,
                            permissions: permission.permissions
                        })
                    } else {
                        let userClientPermissions = new UserClientPermissions()

                        userClientPermissions = Object.assign(userClientPermissions, permission)
                        userClientPermissions.idUser = id

                        userClientPermissions.createdAt = new Date()
                        userClientPermissions.updatedAt = userClientPermissions.createdAt

                        await this.repository.addPermissions(userClientPermissions)
                    }
                }
            }

            return await this.show({ idUser: id })
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'update', __filename, error)
        }
    }

    async sendInformationToResetPassword (username: string): Promise<Pick<ResetPassword, 'idResetPassword'> | ErrorRequestResponse> {
        try {
            const user = await this.repository.show({ username })
            if (user instanceof ErrorRequestResponse) throw user

            const userResetPassword = new ResetPassword()
            userResetPassword.used = false
            userResetPassword.idUser = user.idUser

            return this.resetPasswordRepository.sendInformationToResetPassword(userResetPassword)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'sendInformationToResetPassword', __filename, error)
        }
    }

    async resetPassword (idResetPassword: string, dto: ResetPasswordDto): Promise<IResultGenericResponse | ErrorRequestResponse> {
        try {
            const resetPassword = await this.resetPasswordRepository.showResetPasswordNotUsed(idResetPassword)

            if (resetPassword instanceof ErrorRequestResponse) {
                throw new NotFoundException("It's not possible reset password because this link used before or not valid")
            }

            const nowLessFourHours = this.dateImplementation.subHours(new Date(), 4)
            if (nowLessFourHours > resetPassword.createdAt) {
                throw new Error('Expire time to reset password, the time valid is four hours after the link was sent')
            }

            const { password } = dto
            const passwordCrypt = await this.cryptImplementation.hash(password)

            const { idUser } = resetPassword
            await this.repository.updatePassword(idUser, passwordCrypt)
            return await this.resetPasswordRepository.resetPassword(idResetPassword)
        } catch (error) {
            return MakeErrorRequestResponseV2('public.user_client', 'resetPassword', __filename, error)
        }
    }
}