import { Document } from 'mongoose';

export interface IncomeStatisticInterface extends Document {
  data: number[];
  labels: Date[];
}

export class IncomeStatisticDto {
  public labels: Date[] = [];
  public data: number[] = [];

  constructor(data?: IncomeStatisticDto) {
    if (data) {
      this.data = data.data;
      this.labels = data.labels;
    }
  }
}
