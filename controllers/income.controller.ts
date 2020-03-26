import boom from 'boom';
import { Request, Response } from 'express';

import IncomeModel from '@/models/Income';
import { IncomeInterface, IncomeDto } from '@/@types/models';
import incomeStatisticsController from '@/controllers/income-statistics.controller';

const get = (req: Request, res: Response) => {
  return IncomeModel.find()
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IncomeInterface[]) => res.send(data))
    .catch(err => res.send(boom.notFound(err)));
};

const create = (req: Request, res: Response) => {
  return IncomeModel.create(new IncomeDto(req.body))
    .then((data: IncomeInterface) => {
      incomeStatisticsController.update(data);
      return res.send(data);
    })
    .catch(err => res.send(boom.notFound(err)));
};

const remove = (req: Request, res: Response) => {
  return IncomeModel.findOneAndRemove({ _id: req.params.incomeId })
    .then(data => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.send(boom.notFound('Income id not found'));
      }
    })
    .catch(err => res.send(boom.notFound(err)));
};

const update = (req: Request, res: Response) => {
  return IncomeModel.findOneAndUpdate(
    { _id: req.params.incomeId },
    { $set: new IncomeDto(req.body) },
    { new: true }
  )
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send(boom.notFound('Income id not found'));
      }
    })
    .catch(err => res.send(boom.notFound(err)));
};

export default {
  get,
  create,
  remove,
  update
};
