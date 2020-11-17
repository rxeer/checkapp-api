import boom from 'boom';
import { Request, Response } from 'express';

import UserModel from '@/models/User';
import {
  UserInterface,
  UserDto,
  IGetUserAuthInfoRequest,
} from '@/@types/models';

const login = (req: Request, res: Response) => {
  return (
    UserModel.findOne({ email: req.body.email })
      //  @ts-ignore
      .then((user: UserInterface) => {
        if (user && user.validatePassword(req.body.password)) {
          return res.send(user.toAuthJSON());
        }
      })
      .catch(() => {
        res.json(boom.notFound('Email or password incorrect'));
      })
  );
};

const register = (req: Request, res: Response) => {
  const user = req.body;

  const finalUser: UserInterface = new UserModel(user);
  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.json(finalUser.toAuthJSON()))
    .catch(() => {
      res.json(boom.notFound('User already exist'));
    });
};

const getCurrent = (req: IGetUserAuthInfoRequest, res: Response) => {
  const {
    payload: { id },
  } = req;

  //  @ts-ignore
  return UserModel.getById(id).then((user: UserDto) => {
    if (!user) {
      throw boom.notFound('User not found');
    }
    //  @ts-ignore
    return res.json(new UserDto({ ...user._doc, id }));
  });
};

export default {
  login,
  register,
  getCurrent,
};
