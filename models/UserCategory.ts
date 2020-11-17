import mongoose, { Schema } from 'mongoose';

import { ICategoryInterface } from '@/@types/models/UserCategory';

const categorySchema: Schema = new Schema({
  description: { type: String },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICategoryInterface>('Category', categorySchema);
