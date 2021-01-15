import mongoose, { Schema } from 'mongoose';
import { IncomeStatisticInterface } from '@/@types/models/Statistics';

const incomeSchema: Schema = new Schema({
  labels: [Date],
  data: [Number],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<IncomeStatisticInterface>(
  'IncomeStatistics',
  incomeSchema
);
