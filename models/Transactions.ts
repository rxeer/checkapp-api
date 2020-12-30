import mongoose, { Schema } from 'mongoose';
//  @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2';

import { ITransactionInterface } from '@/@types/models/Transaction';

const transactionSchema: Schema = new Schema({
  description: { type: String },
  count: { type: Number, required: true },
  userId: { type: String, required: true },
  category: { type: Object, required: true },
  familyGroup: { type: Object, required: false },
  createdDate: { type: Date, default: Date.now, required: true },
});

transactionSchema.plugin(mongoosePaginate);

export default mongoose.model<ITransactionInterface>(
  'Product',
  transactionSchema
);
