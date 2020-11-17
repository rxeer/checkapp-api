import mongoose, { Schema } from 'mongoose';

import { CategoryInterface } from '@/@types/models';

const categorySchema: Schema = new Schema({
  description: { type: String },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<CategoryInterface>('Category', categorySchema);
