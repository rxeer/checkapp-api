import Koa from 'koa';
import path from 'path';
import yamljs from 'yamljs';
import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';

const router = new Router();
const spec = yamljs.load(path.resolve('./.openapi.yaml'));

export const configureApiDocs = (app: Koa) => {
  router.get('/api-docs',  koaSwagger({
    routePrefix: false,
    swaggerOptions: { spec }
}))
app.use(router.routes()).use(router.allowedMethods())
};
