import boom from 'boom';
import { Response } from 'express';

import TransactionModel from '@/models/Transactions';

import {
  TransactionDto,
  ITransactionInterface,
  ITransactionRequest,
} from '@/@types/models/Transaction';

const create = (req: ITransactionRequest, res: Response) => {
  if (req.body) {
    TransactionModel.create(
      //  @ts-ignore
      new TransactionDto({
        ...req.body,
        userId: req.params.userId,
      })
    )
      .then((data: ITransactionInterface) => {
        return res.send(data);
      })
      .catch((err) => res.json(boom.notFound(err)));
  }
};

const get = (req: ITransactionRequest, res: Response) => {
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
    .catch((err: any) => res.json(boom.notFound(err)));
};

const getAll = (req: ITransactionRequest, res: Response) => {
  const userId = req.params.userId;

  return TransactionModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: ITransactionInterface[]) => {
      res.json(data);
    })
    .catch((err: any) => res.json(boom.notFound(err)));
};

const remove = (req: ITransactionRequest, res: Response) => {
  return TransactionModel.findOneAndRemove({ _id: req.params.transactionId })
    .then((data) => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.json(boom.notFound('transactionId not found'));
      }
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const update = (req: ITransactionRequest, res: Response) => {
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

    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.json(boom.notFound('transactionId not found'));
      }
    })
    .catch((err) => res.json(boom.notFound(err)));
};

export default {
  get,
  getAll,
  remove,
  update,
  create,
};
