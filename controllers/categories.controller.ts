import boom from 'boom';
import { Request, Response } from 'express';

import CategoryModel from '@/models/Category';
import { CategoryDto, CategoryInterface } from '@/@types/models';
import categoriesController from '@/controllers/categories.controller';

const get = (req: Request, res: Response) => {
  return CategoryModel.find()
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: CategoryInterface[]) => res.send(data))
    .catch((err) => res.send(boom.notFound(err)));
};

const create = (req: Request, res: Response) => {
  return CategoryModel.create(new CategoryDto(req.body))
    .then((data: CategoryInterface) => {
      return res.send(data);
    })
    .catch((err) => res.send(boom.notFound(err)));
};

const remove = (req: Request, res: Response) => {
  return CategoryModel.findOneAndRemove({ _id: req.params.categoryId })
    .then((data) => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.send(boom.notFound('Income id not found'));
      }
    })
    .catch((err) => res.send(boom.notFound(err)));
};

const update = (req: Request, res: Response) => {
  return CategoryModel.findOneAndUpdate(
    { _id: req.params.categoryId },
    { $set: new CategoryDto(req.body) },
    { new: true }
  )

    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send(boom.notFound('Income id not found'));
      }
    })
    .catch((err) => res.send(boom.notFound(err)));
};

export default {
  get,
  create,
  remove,
  update,
};
