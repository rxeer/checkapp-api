import { Context } from 'koa';

import TransactionModel from '@/models/Transactions';

import {
  TransactionDto,
  ITransactionInterface,
} from '@/@types/models/Transaction';

const create = (ctx: Context) => {
  if (ctx.request.body) {
    TransactionModel.create(
      //  @ts-ignore
      new TransactionDto({
        ...ctx.request.body,
        userId: ctx.request.query.userId,
      })
    )
      .then((data: ITransactionInterface) => {
        ctx.body = data;
      })
      .catch((err) => ctx.throw(err));
  }
};

const get = (ctx: Context) => {
  const userId = ctx.request.query.userId;

  //  @ts-ignore
  return TransactionModel.paginate(
    { userId },
    {
      page: ctx.request.query.page,
      limit: ctx.request.query.limit,
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
  const userId = ctx.request.query.userId;

  return TransactionModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: ITransactionInterface[]) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const remove = (ctx: Context) => {
  return TransactionModel.findOneAndRemove({
    _id: ctx.request.query.transactionId,
  })
    .then((data: ITransactionInterface) => {
      if (data) {
        ctx.body = { id: data._id };
      } else {
        ctx.throw('transactionId not found');
      }
    })
    .catch((err: Error) => ctx.throw(err));
};

const update = (ctx: Context) => {
  return TransactionModel.findOneAndUpdate(
    { _id: ctx.request.query.transactionId },
    {
      //   @ts-ignore
      $set: new TransactionDto({
        ...ctx.request.body,
        userId: ctx.request.query.userId,
      }),
    },
    { new: true }
  )

    .then((data: ITransactionInterface) => {
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
