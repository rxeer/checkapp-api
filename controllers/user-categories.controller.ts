import boom from 'boom';
import { Response } from 'express';

import UserCategoryModel from '@/models/UserCategory';
import {
  IUserCategoryDto,
  IUserCategoriesRequest,
  IUserCategoryInterface,
} from '@/@types/models/UserCategory';

const get = (req: IUserCategoriesRequest, res: Response) => {
  const userId = req.params.userId;

  return UserCategoryModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IUserCategoryInterface[]) => {
      res.json(data);
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const create = (req: IUserCategoriesRequest, res: Response) => {
  const userId = req.params.userId;

  return UserCategoryModel.create({
    ...req.body,
    userId,
  })
    .then((data: IUserCategoryInterface) => {
      return res.send(data);
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const remove = (req: IUserCategoriesRequest, res: Response) => {
  return UserCategoryModel.findOne({ _id: req.params.categoryId })
    .then((data) => {
      return UserCategoryModel.findOneAndUpdate(
        { _id: req.params.categoryId },
        //  @ts-ignore
        { $set: new IUserCategoryDto({ ...data._doc, active: false }) },
        { new: true }
      )
        .then((category) => {
          if (category) {
            res.send({ id: req.params.categoryId });
          } else {
            res.json(boom.notFound('Category not found'));
          }
        })
        .catch((err) => res.json(boom.notFound(err)));
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const update = (req: IUserCategoriesRequest, res: Response) => {
  const userId = req.params.userId;

  return UserCategoryModel.findOneAndUpdate(
    { _id: req.params.categoryId },
    { $set: { ...req.body, userId, active: true } },
    { new: true }
  )

    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.json(boom.notFound('Category not found'));
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
