import mongoose, { Schema } from 'mongoose';

import { IncomeInterface } from '@/@types/models/Incomes';

const incomeSchema: Schema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, default: '' },
  type: { type: String, required: true },
  income: { type: Number, required: true, default: 0 },
});

export default mongoose.model<IncomeInterface>('Income', incomeSchema);
