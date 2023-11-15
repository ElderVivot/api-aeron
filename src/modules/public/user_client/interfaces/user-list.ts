import { User } from '../user.entity'

export type IUserList = Omit<User, 'password' | 'id' | 'clients'>