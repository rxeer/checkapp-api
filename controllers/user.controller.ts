import boom from 'boom';
import { Request, Response } from 'express';

import UserModel from '@/models/User';
import { UserInterface, UserDto } from '@/@types/models';

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
        throw boom.notFound('Email or password incorrect');
      })
  );
};

const register = (req: Request, res: Response) => {
  const user = req.body;

  const finalUser: UserInterface = new UserModel(user);
  finalUser.setPassword(user.password);

  return finalUser.save().then(() => res.json(finalUser.toAuthJSON()));
};

const getCurrent = (req: Request, res: Response) => {
  const {
    //  @ts-ignore
    payload: { id }
  } = req;

  //  @ts-ignore
  return UserModel.getById(id).then((user: UserInterface) => {
    if (!user) {
      throw boom.notFound('User not found');
    }

    return res.json(new UserDto(user));
  });
};

export default {
  login,
  register,
  getCurrent
};
