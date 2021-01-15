import { Context } from 'koa';

import IncomeModel from '@/models/Incomes';
import { IncomeInterface, IncomeDto } from '@/@types/models/Incomes';

const get = (ctx: Context) => {
  const userId = ctx.request.query.userId;

  return IncomeModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IncomeInterface[]) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const create = (ctx: Context) => {
  return IncomeModel.create({
    ...ctx.request.body,
    userId: ctx.request.query.userId,
  })
    .then((data: IncomeInterface) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const remove = (ctx: Context) => {
  return IncomeModel.findOneAndRemove({ _id: ctx.request.query.incomeId })
    .then((data: IncomeInterface) => {
      if (data) {
        ctx.body = { id: data._id };
      } else {
        ctx.throw('Income id not found');
      }
    })
    .catch((err: Error) => ctx.throw(err));
};

const update = (ctx: Context) => {
  const newData = {
    ...ctx.request.body,
    userId: ctx.request.query.userId,
  };
  return IncomeModel.findOneAndUpdate(
    { _id: ctx.request.query.incomeId },
    //  @ts-ignore
    { $set: new IncomeDto(newData) },
    { new: true }
  )
    .then((data: IncomeInterface) => {
      if (data) {
        ctx.body = data;
      } else {
        ctx.throw('Income id not found');
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
