import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IFamilyGroupInterface } from '@/@types/models/FamilyGroup';

const familyGroupSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  active: { type: Boolean, default: true },
  description: { type: String, default: '', required: true },
});

familyGroupSchema.plugin(uniqueValidator, {
  message: 'Family group already exist',
});
export default mongoose.model<IFamilyGroupInterface>(
  'FamilyGroup',
  familyGroupSchema
);
