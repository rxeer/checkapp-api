import config from 'config';
import { expressjwt } from 'express-jwt';
import { Request } from 'express';

type Algorithm =
    "HS256" | "HS384" | "HS512" |
    "RS256" | "RS384" | "RS512" |
    "ES256" | "ES384" | "ES512" |
    "PS256" | "PS384" | "PS512" |
    "none";

const algorithm: Algorithm = config.get('auth.alg');
const authSecret: string = config.get('auth.secret');

const getTokenFromHeaders = (req: Request): any => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
};

const auth = {
  required: expressjwt({
    secret: authSecret,
    algorithms: [algorithm],
    getToken: getTokenFromHeaders,
  }),
  optional: expressjwt({
    secret: authSecret,
    algorithms: [algorithm],
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

export default auth;
