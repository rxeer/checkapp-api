import { Context } from 'koa';

import UserModel from '@/models/User';
import { IUserInterface, UserDto } from '@/@types/models/User';

const login = (ctx: Context) => {
  return (
    UserModel.findOne({ email: ctx.request.body.email })
      //  @ts-ignore
      .then((user: IUserInterface) => {
        if (!user) {
          return ctx.throw('Email or password incorrect');
        }

        if (!user.validatePassword(ctx.request.body.password)) {
          return ctx.throw('Incorrect password');
        }

        if (user && user.validatePassword(ctx.request.body.password)) {
          return (ctx.body = user.toAuthJSON());
        }
      })
      .catch(() => {
        ctx.throw('Email or password incorrect');
      })
  );
};

const register = (ctx: Context) => {
  const user = ctx.request.body;

  const finalUser: IUserInterface = new UserModel(user);
  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => (ctx.body = finalUser.toAuthJSON()))
    .catch((err) => {
      ctx.throw(err);
    });
};

const getCurrent = (ctx: Context) => {
  const userId = ctx.state?.user?.id;
  //  @ts-ignore
  return UserModel.getById(userId).then((user: UserDto) => {
    if (!user) {
      ctx.throw('User not found');
    }
    //  @ts-ignore
    return (ctx.body = new UserDto({ ...user._doc, id: userId }));
  });
};

const update = (ctx: Context) => {
  const newData = {
    ...ctx.request.body,
  };
  const userId = ctx.state?.user?.id;

  return UserModel.findOneAndUpdate(
    { _id: userId },
    //  @ts-ignore
    { $set: new UserDto(newData) },
    { new: true }
  )
    .then((user: IUserInterface) => {
      if (user) {
        //  @ts-ignore
        return (ctx.body = new UserDto({ ...user._doc, id: userId }));
      } else {
        ctx.throw('User not found');
      }
    })
    .catch((err: any) => ctx.throw(err));
};

export default {
  login,
  update,
  register,
  getCurrent,
};
