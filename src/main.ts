import 'dotenv/config'
import './tracer'

import { json, urlencoded } from 'body-parser'

import { ErrorRequestResponseFilter } from '@common/filters/error-request-response.filter'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap () {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ exposedHeaders: ['x-total-count', 'tenant'] })
    app.setGlobalPrefix('v1')
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ limit: '50mb', extended: true }))

    app.useGlobalFilters(new ErrorRequestResponseFilter())

    await app.listen(process.env.API_PORT)
}
bootstrap()