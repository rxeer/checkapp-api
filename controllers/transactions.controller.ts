import { Context } from 'koa';

import TransactionModel from '@/models/Transactions';

import {
  TransactionDto,
  ITransactionInterface,
  ITransactionRequest,
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
        return (ctx.data = data);
      })
      .catch((err) => ctx.throw(err));
  }
};

const get = (ctx: Context) => {
  const userId = req.params.userId;

  //  @ts-ignore
  return TransactionModel.paginate(
    { userId },
    {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdDate: 'desc' },
      customLabels: {
        docs: 'list',
      },
    }
  )
    .then((data: ITransactionInterface[]) => {
      res.json(data);
    })
    .catch((err: Error) => res.json(boom.notFound(`${err}`)));
};

const getAll = (ctx: Context) => {
  const userId = req.params.userId;

  return TransactionModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: ITransactionInterface[]) => {
      res.json(data);
    })
    .catch((err: Error) => res.json(boom.notFound(`${err}`)));
};

const remove = (ctx: Context) => {
  return TransactionModel.findOneAndRemove({ _id: req.params.transactionId })
    .then((data: ITransactionInterface) => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.json(boom.notFound('transactionId not found'));
      }
    })
    .catch((err: Error) => res.json(boom.notFound(`${err}`)));
};

const update = (ctx: Context) => {
  return TransactionModel.findOneAndUpdate(
    { _id: req.params.transactionId },
    {
      //   @ts-ignore
      $set: new TransactionDto({
        ...req.body,
        userId: req.params.userId,
      }),
    },
    { new: true }
  )

    .then((data: ITransactionInterface) => {
      if (data) {
        res.send(data);
      } else {
        res.json(boom.notFound('transactionId not found'));
      }
    })
    .catch((err: Error) => res.json(boom.notFound(`${err}`)));
};

export default {
  get,
  getAll,
  remove,
  update,
  create,
};
