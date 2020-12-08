import { Document } from 'mongoose';

export interface IncomeStatisticInterface extends Document {
  data: number[];
  labels: Date[];
  userId: string;
}

export class IncomeStatisticDto {
  public labels: Date[] = [];
  public data: number[] = [];
  public userId: string = '';

  constructor(data?: IncomeStatisticDto) {
    if (data) {
      this.data = data.data;
      this.userId = data.userId;
      this.labels = data.labels;
    }
  }
}
