import mongoose, { Schema } from 'mongoose';

import { IFamilyGroupInterface } from '@/@types/models/FamilyGroup';

const familyGroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, default: '' },
});

export default mongoose.model<IFamilyGroupInterface>(
  'FamilyGroup',
  familyGroupSchema
);
