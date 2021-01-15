import config from 'config';
import jwt from 'koa-jwt';
import Koa, { Context } from 'koa';

const authSecret: string = config.get('auth.secret');

const getTokenFromHeaders = (ctx: Context) => {
  const {
    headers: { authorization },
  } = ctx.request;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: authSecret,
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: authSecret,
    getToken: getTokenFromHeaders,
  }),
};

export const configureAuth = (app: Koa) => {
  app.use(jwt({ secret: authSecret }));
};

export default auth;
