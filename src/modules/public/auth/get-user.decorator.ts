import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User } from '../user_client/user.entity'

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): Omit<User, 'password'> => {
    const req = ctx.switchToHttp().getRequest()
    delete req.user.password
    return req.user
})