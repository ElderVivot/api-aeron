"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./tracer");
const body_parser_1 = require("body-parser");
const error_request_response_filter_1 = require("./common/filters/error-request-response.filter");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ exposedHeaders: ['x-total-count', 'tenant'] });
    app.setGlobalPrefix('v1');
    app.use((0, body_parser_1.json)({ limit: '50mb' }));
    app.use((0, body_parser_1.urlencoded)({ limit: '50mb', extended: true }));
    app.useGlobalFilters(new error_request_response_filter_1.ErrorRequestResponseFilter());
    await app.listen(process.env.API_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map