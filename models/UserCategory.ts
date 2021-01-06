import mongoose, { Schema } from 'mongoose';

import { IUserCategoryInterface } from '@/@types/models/UserCategory';

const categorySchema: Schema = new Schema({
  description: { type: String },
  name: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUserCategoryInterface>(
  'Category',
  categorySchema
);
