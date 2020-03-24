import config from 'config';
import jwt from 'express-jwt';
import { Request } from 'express';

const authSecret: string = config.get('auth.secret');

const getTokenFromHeaders = (req: Request) => {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: authSecret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: authSecret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

export default auth;
