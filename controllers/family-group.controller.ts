import { Context } from 'koa';

import FamilyGroupModel from '@/models/FamilyGroup';
import {
  IFamilyGroupInterface,
  FamilyGroupDto,
} from '@/@types/models/FamilyGroup';

const get = (ctx: Context) => {
  const userId = ctx.request.query.userId;

  return FamilyGroupModel.find({ userId })
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IFamilyGroupInterface[]) => {
      ctx.body = data;
    })
    .catch((err: Error) => {
      ctx.body = ctx.request.query;
    });
};

const create = (ctx: Context) => {
  return FamilyGroupModel.create({
    ...ctx.request.body,
    userId: ctx.request.query.userId,
  })
    .then((data: IFamilyGroupInterface) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const remove = (ctx: Context) => {
  return FamilyGroupModel.findOne({ _id: ctx.request.query.familyId })
    .then((data: IFamilyGroupInterface) => {
      return FamilyGroupModel.findOneAndUpdate(
        { _id: ctx.request.query.familyId },
        //  @ts-ignore
        { $set: new FamilyGroupDto({ ...data._doc, active: false }) },
        { new: true }
      )
        .then((familyGroup: IFamilyGroupInterface) => {
          if (familyGroup) {
            ctx.body = { id: familyGroup.id };
          } else {
            ctx.throw('Family group not found');
          }
        })
        .catch((err: Error) => ctx.throw(err));
    })
    .catch((err: Error) => ctx.throw(err));
};

const update = (ctx: Context) => {
  const newData = {
    ...ctx.request.body,
    active: true,
    userId: ctx.router.userId,
  };
  return FamilyGroupModel.findOneAndUpdate(
    { _id: ctx.request.query.familyId },
    //  @ts-ignore
    { $set: new FamilyGroupDto(newData) },
    { new: true }
  )
    .then((data: IFamilyGroupInterface) => {
      if (data) {
        ctx.body = data;
      } else {
        ctx.status = 404;
        ctx.throw('Family group not found');
      }
    })
    .catch((err: Error) => ctx.throw(err));
};

export default {
  get,
  create,
  remove,
  update,
};
