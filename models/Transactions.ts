import mongoose, { Schema } from 'mongoose';
//  @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2';

import { ITransactionInterface } from '@/@types/models/Transaction';

const transactionSchema: Schema = new Schema({
  description: { type: String },
  count: { type: Number, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  category: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    name: { type: String },
  },
  familyGroup: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: 'FamilyGroup',
    },
    name: { type: String },
  },
  createdDate: { type: Date, default: Date.now, required: true },
});

transactionSchema.plugin(mongoosePaginate);

export default mongoose.model<ITransactionInterface>(
  'Product',
  transactionSchema
);
