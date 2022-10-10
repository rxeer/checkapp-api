import { Context } from 'koa';

import TransactionModel from '@/models/Transactions';

import {
  TransactionDto,
  ITransactionInterface,
} from '@/@types/models/Transaction';

const create = (ctx: Context) => {
  if (ctx.request.body) {
    return TransactionModel.create(
      //  @ts-ignore
      new TransactionDto({
        ...ctx.request.body,
        userId: ctx.params.userId,
      })
    )
      .then((data: ITransactionInterface) => {
        ctx.body = data;
      })
      .catch((err) => ctx.throw(err));
  }
};

const get = (ctx: Context) => {
  const userId = ctx.params.userId;
  //  @ts-ignore
  return TransactionModel.paginate(
    { userId },
    {
      page: ctx.query.page || 1,
      limit: ctx.query.limit || 10,
      sort: { createdDate: 'desc' },
      customLabels: {
        docs: 'list',
      },
    }
  )
    .then((data: ITransactionInterface[]) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const getAll = (ctx: Context) => {
  const userId = ctx.params.userId;

  return TransactionModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: ITransactionInterface[]) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const remove = (ctx: Context) => {
  const transactionId = ctx.params.transactionId;

  return TransactionModel.findOneAndRemove({
    _id: transactionId,
  })
    .then((data: any) => {
      if (data) {
        ctx.body = { id: data._id };
      } else {
        ctx.throw('transactionId not found');
      }
    })
    .catch((err: Error) => ctx.throw(err));
};

const update = (ctx: Context) => {
  const userId = ctx.params.userId;
  const transactionId = ctx.params.transactionId;

  return TransactionModel.findOneAndUpdate(
    { _id: transactionId },
    {
      //   @ts-ignore
      $set: new TransactionDto({
        ...ctx.request.body,
        userId,
      }),
    },
    { new: true }
  )

    .then((data: any) => {
      if (data) {
        ctx.body = data;
      } else {
        ctx.throw('transactionId not found');
      }
    })
    .catch((err: Error) => ctx.throw(err));
};

export default {
  get,
  getAll,
  remove,
  update,
  create,
};
