import { Document } from 'mongoose';
import { IGetUserAuthInfoRequest } from './General';

export interface IncomeInterface extends Document {
  date: Date;
  income: number;
  userId: string;
  type: string;
  description: string;
}

export interface IIncomesRequest extends IGetUserAuthInfoRequest {
  params: {
    userId: string;
    incomeId: string;
  };
}

export class IncomeDto {
  public income: number = 0;
  public userId: string = '';
  public type: string = '';
  public date: Date = new Date();
  public description: string = '';

  constructor(data?: IncomeDto) {
    if (data) {
      this.date = data.date;
      this.type = data.type;
      this.income = data.income;
      this.userId = data.userId;
      this.description = data.description;
    }
  }
}
