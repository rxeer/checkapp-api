import { Context } from 'koa';

import UserCategoryModel from '@/models/UserCategory';
import {
  IUserCategoryDto,
  IUserCategoriesRequest,
  IUserCategoryInterface,
} from '@/@types/models/UserCategory';

const get = (ctx: Context) => {
  const userId = ctx.reqest.query.userId;

  return UserCategoryModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IUserCategoryInterface[]) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const create = (ctx: Context) => {
  const userId = ctx.reqest.query.userId;

  return UserCategoryModel.create({
    ...ctx.reqest.body,
    userId,
  })
    .then((data: IUserCategoryInterface) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const remove = (ctx: Context) => {
  return UserCategoryModel.findOne({ _id: ctx.reqest.query.categoryId })
    .then((data: IUserCategoriesRequest) => {
      return UserCategoryModel.findOneAndUpdate(
        { _id: ctx.reqest.query.categoryId },
        //  @ts-ignore
        { $set: new IUserCategoryDto({ ...data._doc, active: false }) },
        { new: true }
      )
        .then((category: IUserCategoryInterface) => {
          if (category) {
            ctx.body = { id: ctx.reqest.query.categoryId };
          } else {
            ctx.throw('Category not found');
          }
        })
        .catch((err: Error) => ctx.throw(err));
    })
    .catch((err: Error) => ctx.throw(err));
};

const update = (ctx: Context) => {
  const userId = ctx.reqest.query.userId;

  return UserCategoryModel.findOneAndUpdate(
    { _id: ctx.reqest.query.categoryId },
    { $set: { ...ctx.request.body, userId, active: true } },
    { new: true }
  )

    .then((data: IUserCategoriesRequest) => {
      if (data) {
        ctx.body = data;
      } else {
        ctx.throw('Category not found');
      }
    })
    .catch((err: Error) => ctx.throw(err));
};

export default {
  get,
  create,
  remove,
  update,
};
