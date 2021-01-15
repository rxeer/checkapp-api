import mongoose, { Schema } from 'mongoose';
//  @ts-ignore
import mongoosePaginate from 'mongoose-paginate-v2';
import { ITransactionInterface } from '@/@types/models/Transaction';

const transactionSchema: Schema = new Schema({
  description: { type: String, required: false, default: '' },
  count: { type: Number, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: { type: String, required: true },
  },
  familyGroup: {
    id: {
      type: mongoose.Types.ObjectId,
      ref: 'FamilyGroup',
      required: true,
    },
    name: { type: String, required: true },
  },
  createdDate: { type: Date, default: Date.now, required: true },
});

transactionSchema.plugin(mongoosePaginate);

export default mongoose.model<ITransactionInterface>(
  'Product',
  transactionSchema
);
