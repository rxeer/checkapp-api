import boom from 'boom';
import { Request, Response } from 'express';
import omit from 'lodash/omit';
import toPlainObject from 'lodash/toPlainObject';

import IncomeModel from '@/models/Incomes';
import {
  IncomeInterface,
  IncomeDto,
  IIncomesRequest,
} from '@/@types/models/Incomes';
import statisticsController from '@/controllers/statistics.controller';

const get = (req: Request, res: Response) => {
  const userId = req.params.userId;

  return IncomeModel.find()
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IncomeInterface[]) => {
      const list = data
        .filter((item: IncomeInterface) => item.userId === userId)
        .map((item: IncomeInterface) => omit(item, 'userId'));

      res.send(list);
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const create = (req: IIncomesRequest, res: Response) => {
  return IncomeModel.create({
    ...req.body,
    userId: req.params.userId,
  })
    .then((data: IncomeInterface) => {
      statisticsController.updateIncome(data);
      return res.send(omit(toPlainObject(data), 'userId'));
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const remove = (req: IIncomesRequest, res: Response) => {
  return IncomeModel.findOneAndRemove({ _id: req.params.incomeId })
    .then((data) => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.json(boom.notFound('Income id not found'));
      }
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const update = (req: IIncomesRequest, res: Response) => {
  const newData = {
    ...req.body,
    userId: req.params.userId,
  };
  return IncomeModel.findOneAndUpdate(
    { _id: req.params.incomeId },
    //  @ts-ignore
    { $set: new IncomeDto(newData) },
    { new: true }
  )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.json(boom.notFound('Income id not found'));
      }
    })
    .catch((err) => res.json(boom.notFound(err)));
};

export default {
  get,
  create,
  remove,
  update,
};
