import mongoose, { Schema } from 'mongoose';

import { IProductInterface } from '@/@types/models/Product';

const productSchema: Schema = new Schema({
  description: { type: String },
  count: { type: Number, required: true },
  userId: { type: String, required: true },
  category: { type: Object, required: true },
  familyGroup: { type: Object, required: false },
  createdDate: { type: Date, default: Date.now, required: true },
});

export default mongoose.model<IProductInterface>('Product', productSchema);
