import { IUserAuth } from './user'
export interface ISignIn {
    accessToken: string
    user: IUserAuth
}