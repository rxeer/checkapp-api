import config from 'config';
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import UserModel from '@/models/User';
import { IUserInterface } from '@/@types/models';

const passportOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

if (config.has('auth.secret')) {
  passportOptions.secretOrKey = config.get('auth.secret');
}

const strategy: Strategy = new Strategy(passportOptions, (jwtPayload, next) => {
  //  @ts-ignore
  UserModel.getById(jwtPayload.id)
    .then((user: IUserInterface) => {
      if (user && user.validatePassword('123123')) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
    .catch(() => {
      next(null, false);
    });
});

passport.use(strategy);
