import config from 'config';
import jwt from 'koa-jwt';
import Koa from 'koa';

const authSecret: string = config.get('auth.secret');

export const configureAuth = (app: Koa) => {
  app.use(jwt({
    secret: authSecret
  }).unless({
    path: [/^\/public/, /^\/admin/, /register/, /login/]
  }));
};
