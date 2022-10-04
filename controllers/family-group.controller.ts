import { Context } from 'koa';

import FamilyGroupModel from '@/models/FamilyGroup';
import {
  IFamilyGroupInterface,
  FamilyGroupDto,
} from '@/@types/models/FamilyGroup';

const get = (ctx: Context) => {
  const userId = ctx.params.userId;

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
  const userId = ctx.params.userId;

  return FamilyGroupModel.create({
    ...ctx.request.body,
    userId,
  })
    .then((data: IFamilyGroupInterface) => {
      ctx.body = data;
    })
    .catch((err: Error) => ctx.throw(err));
};

const remove = (ctx: Context) => {
  const familyId = ctx.params.familyId;

  return FamilyGroupModel.findOne({ _id: familyId })
    .then((data: any) => {
      return FamilyGroupModel.findOneAndUpdate(
        { _id: familyId },
        //  @ts-ignore
        { $set: new FamilyGroupDto({ ...data._doc, active: false }) },
        { new: true }
      )
        .then((familyGroup: any) => {
          if (familyGroup) {
            ctx.body = { id: familyGroup.id };
          } else {
            ctx.status = 404;
            ctx.throw('Family group not found');
          }
        })
        .catch((err: Error) => ctx.throw(err));
    })
    .catch((err: Error) => ctx.throw(err));
};

const update = (ctx: Context) => {
  const userId = ctx.params.userId;
  const familyId = ctx.params.familyId;

  const newData = {
    ...ctx.request.body,
    active: true,
    userId,
  };

  return FamilyGroupModel.findOneAndUpdate(
    { _id: familyId },
    //  @ts-ignore
    { $set: new FamilyGroupDto(newData) },
    { new: true }
  )
    .then((data: any) => {
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
