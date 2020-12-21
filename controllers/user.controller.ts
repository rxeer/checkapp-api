import boom from 'boom';
import { Request, Response } from 'express';

import UserModel from '@/models/User';
import { IUserInterface, UserDto } from '@/@types/models/User';
import { IGetUserAuthInfoRequest } from '@/@types/models/General';

const login = (req: Request, res: Response) => {
  return (
    UserModel.findOne({ email: req.body.email })
      //  @ts-ignore
      .then((user: IUserInterface) => {
        if (!user) {
          return res.json(boom.notFound('Email or password incorrect'));
        }

        if (!user.validatePassword(req.body.password)) {
          return res.json(boom.notFound('Incorrect password'));
        }

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

  const finalUser: IUserInterface = new UserModel(user);
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

const update = (req: IGetUserAuthInfoRequest, res: Response) => {
  const newData = {
    ...req.body,
  };
  return UserModel.findOneAndUpdate(
    { _id: req.payload.id },
    //  @ts-ignore
    { $set: new UserDto(newData) },
    { new: true }
  )
    .then((user) => {
      if (user) {
        //  @ts-ignore
        return res.json(new UserDto({ ...user._doc, id: req.payload.id }));
      } else {
        res.json(boom.notFound('User not found'));
      }
    })
    .catch((err) => res.json(boom.notFound(err)));
};

export default {
  login,
  update,
  register,
  getCurrent,
};
