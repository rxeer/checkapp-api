import { Document } from 'mongoose';

export interface IncomeStatisticInterface extends Document {
  data: number[];
  labels: Date[];
  userId: string;
  total: number;
}

export class IncomeStatisticDto {
  public labels: Date[] = [];
  public data: number[] = [];
  public userId: string = '';
  public total: number = 0;

  constructor(data?: IncomeStatisticDto) {
    if (data) {
      this.data = data.data;
      this.total = data.total;
      this.userId = data.userId;
      this.labels = data.labels;
    }
  }
}
