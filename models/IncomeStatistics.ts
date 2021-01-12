import mongoose, { Schema, Types } from 'mongoose';
import { IncomeStatisticInterface } from '@/@types/models/Statistics';

const incomeSchema: Schema = new Schema({
  labels: [Date],
  data: [Number],
  userId: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model<IncomeStatisticInterface>(
  'IncomeStatistics',
  incomeSchema
);
