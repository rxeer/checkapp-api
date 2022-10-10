import Koa from 'koa';
import logger from 'koa-pino-logger';

export const configureLogger = (app: Koa) => {
  app.use(logger());
};
