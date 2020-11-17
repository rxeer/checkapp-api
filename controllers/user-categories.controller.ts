import boom from 'boom';
import { Response } from 'express';
import omit from 'lodash/omit';

import UserCategoryModel from '@/models/UserCategory';
import {
  IUserCategoriesRequest,
  ICategoryInterface,
} from '@/@types/models/UserCategory';

const get = (req: IUserCategoriesRequest, res: Response) => {
  const userId = req.params.userId;

  return UserCategoryModel.find()
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: ICategoryInterface[]) => {
      const list = data
        .filter((item: ICategoryInterface) => item.userId === userId)
        .map((item: ICategoryInterface) => omit(item, 'userId'));

      res.send(list);
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const create = (req: IUserCategoriesRequest, res: Response) => {
  const userId = req.params.userId;

  return UserCategoryModel.create({
    ...req.body,
    userId,
  })
    .then((data: ICategoryInterface) => {
      return res.send(data);
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const remove = (req: IUserCategoriesRequest, res: Response) => {
  return UserCategoryModel.findOneAndRemove({ _id: req.params.categoryId })
    .then((data) => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.json(boom.notFound('Category not found'));
      }
    })
    .catch((err) => res.send(boom.notFound(err)));
};

const update = (req: IUserCategoriesRequest, res: Response) => {
  const userId = req.params.userId;

  return UserCategoryModel.findOneAndUpdate(
    { _id: req.params.categoryId },
    { $set: { ...req.body, userId } },
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
