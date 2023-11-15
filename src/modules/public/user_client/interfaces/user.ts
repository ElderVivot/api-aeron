import { User } from '../user.entity'

export type IUser = Omit<User, 'password'>