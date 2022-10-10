import { Context } from 'koa';

import UserCategoryModel from '@/models/UserCategory';
import {
  IUserCategoryDto,
  IUserCategoriesRequest,
  IUserCategoryInterface,
} from '@/@types/models/UserCategory';

const get = (ctx: Context) => {
  const userId = ctx.params.userId;

  return UserCategoryModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IUserCategoryInterface[]) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const create = (ctx: Context) => {
  const userId = ctx.params.userId;

  return UserCategoryModel.create({
    ...ctx.request.body,
    userId,
  })
    .then((data: IUserCategoryInterface) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const remove = (ctx: Context) => {
  const categoryId = ctx.params.categoryId;

  return UserCategoryModel.findOne({ _id: categoryId })
    .then((data: any) => {
      return UserCategoryModel.findOneAndUpdate(
        { _id: categoryId },
        //  @ts-ignore
        { $set: new IUserCategoryDto({ ...data._doc, active: false }) },
        { new: true }
      )
        .then((category: any) => {
          if (category) {
            ctx.body = { id: categoryId };
          } else {
            ctx.throw('Category not found');
          }
        })
        .catch((err: Error) => ctx.throw(err));
    })
    .catch((err: Error) => ctx.throw(err));
};

const update = (ctx: Context) => {
  const userId = ctx.params.userId;
  const categoryId = ctx.params.categoryId;

  return UserCategoryModel.findOneAndUpdate(
    { _id: categoryId },
    { $set: { ...ctx.request.body, userId, active: true } },
    { new: true }
  )

    .then((data: any) => {
      if (data) {
        ctx.body = data;
      } else {
        ctx.status = 404;
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
