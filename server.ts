import './moduleAlias';

import config from 'config';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import compress from 'koa-compress';
//  @ts-ignore
import errorHandler from 'koa-better-error-handler';
//  @ts-ignore
import koa404Handler from 'koa-404-handler';
import Koa from 'koa';

import setAppRoutes from './routes';

import {
  configureAuth,
  configureAdmin,
  configureLogger,
  configureConnection,
} from './configurations';

import './authentication';

const app = new Koa();

app.use(cors({ credentials: true }));
app.use(compress());
configureLogger(app);
configureConnection();
app.use(
  bodyParser({
    multipart: true,
    urlencoded: true,
    formidable: {
      uploadDir: './uploads',
      maxFileSize: 20000,
    },
  })
);
app.use(koa404Handler);
app.context.onerror = errorHandler();

configureAuth(app);
setAppRoutes(app);
configureAdmin(app);

if (config.has('port')) {
  const appPort: string = config.get('port');

  app.listen(process.env.PORT || appPort);
}
