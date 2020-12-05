import mongoose, { Schema } from 'mongoose';

import { IncomeStatisticInterface } from '@/@types/models/Statistics';

const incomeSchema: Schema = new Schema({
  labels: [Date],
  data: [Number],
});

export default mongoose.model<IncomeStatisticInterface>(
  'IncomeStatistics',
  incomeSchema
);
