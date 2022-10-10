import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IUserCategoryInterface } from '@/@types/models/UserCategory';

const categorySchema: Schema = new Schema({
  description: { type: String, required: false, default: '' },
  name: { type: String, required: true, unique: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

categorySchema.plugin(uniqueValidator, { message: 'Category already exist' });

export default mongoose.model<IUserCategoryInterface>(
  'Category',
  categorySchema
);
