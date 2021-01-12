import mongoose, { Schema, Types } from 'mongoose';

import { IFamilyGroupInterface } from '@/@types/models/FamilyGroup';

const familyGroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  active: { type: Boolean, default: true },
  description: { type: String, default: '', required: true },
});

export default mongoose.model<IFamilyGroupInterface>(
  'FamilyGroup',
  familyGroupSchema
);
