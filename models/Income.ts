import mongoose, { Schema } from 'mongoose';

import { IncomeInterface } from '@/@types/models';

const incomeSchema: Schema = new Schema({
  description: { type: String },
  name: { type: String, required: true },
	date: { type: Date, default: Date.now() },
	createdAt: { type: Date, default: Date.now },
  price: { type: Number, required: true, default: 0 },
});

export default mongoose.model<IncomeInterface>('Income', incomeSchema);
