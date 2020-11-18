import boom from 'boom';
import { Request, Response } from 'express';
import omit from 'lodash/omit';
import toPlainObject from 'lodash/toPlainObject';

import FamilyGroupModel from '@/models/FamilyGroup';
import {
  IFamilyGroupInterface,
  IFamilyGroupRequest,
  FamilyGroupDto,
} from '@/@types/models/FamilyGroup';

const get = (req: Request, res: Response) => {
  const userId = req.params.userId;

  return FamilyGroupModel.find()
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IFamilyGroupInterface[]) => {
      const list = data
        .filter((item: IFamilyGroupInterface) => item.userId === userId)
        .map((item: IFamilyGroupInterface) => omit(item, 'userId'));

      res.send(list);
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const create = (req: IFamilyGroupRequest, res: Response) => {
  return FamilyGroupModel.create({
    ...req.body,
    userId: req.params.userId,
  })
    .then((data: IFamilyGroupInterface) => {
      return res.send(omit(toPlainObject(data), 'userId'));
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const remove = (req: IFamilyGroupRequest, res: Response) => {
  return FamilyGroupModel.findOneAndRemove({ _id: req.params.familyId })
    .then((data) => {
      if (data) {
        res.send({ id: data._id });
      } else {
        res.json(boom.notFound('Family group not found'));
      }
    })
    .catch((err) => res.json(boom.notFound(err)));
};

const update = (req: IFamilyGroupRequest, res: Response) => {
  const newData = {
    ...req.body,
    userId: req.params.userId,
  };
  return FamilyGroupModel.findOneAndUpdate(
    { _id: req.params.familyId },
    //  @ts-ignore
    { $set: new FamilyGroupDto(newData) },
    { new: true }
  )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.json(boom.notFound('Family group not found'));
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
