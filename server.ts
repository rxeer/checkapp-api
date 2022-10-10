import './moduleAlias';

import Koa from 'koa';
import config from 'config';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-body';
import compress from 'koa-compress';
//  @ts-ignore
import errorHandler from 'koa-better-error-handler';
//  @ts-ignore
import koa404Handler from 'koa-404-handler';

import setAppRoutes from './routes';

import {
  configureAuth,
  configureAdmin,
  configureLogger,
  configureApiDocs,
  configureConnection,
} from './configurations';

import './authentication';

const app = new Koa();

app.use(cors());
app.use(compress());
app.use(helmet());
configureLogger(app);
configureApiDocs(app);
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
