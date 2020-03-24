import './moduleAlias.ts';

import boom from 'boom';
import config from 'config';
import passport from 'passport';
import bodyParser from 'body-parser';
import express, { Request, Response, Application } from 'express';

import router from './routes';
import {
  configureCors,
  configureLogger,
  configureConnection
} from './configurations';

import './authentication';

const app: Application = express();

configureCors(app);
configureLogger(app);
configureConnection();
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/v1', router);

app.get(
  '*',
  wrapAsync(async function(req: Request, res: Response) {
    await new Promise(resolve => setTimeout(() => resolve(), 50));
    throw new Error('Something was swrong');
  })
);

app.use((error: any, req: Request, res: Response, next: Function) => {
  throw boom.notFound(error.message);
});

if (config.has('port')) {
  const appPort: string = config.get('port');

  app.listen(appPort, () => {
    console.log(`Listen on port: ${appPort}`);
  });
}

function wrapAsync(fn: Function) {
  return function(req: Request, res: Response, next: Function) {
    fn(req, res, next).catch(next);
  };
}
