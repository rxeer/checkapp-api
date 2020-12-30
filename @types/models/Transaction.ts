import { Document } from 'mongoose';
import { IGetUserAuthInfoRequest } from './General';

type OptionType = {
  id: string;
  name: string;
};
export interface ITransactionInterface extends Document {
  count: number;
  userId: string;
  createdDate: Date;
  description: string;
  category: OptionType;
  familyGroup: OptionType;
}

export interface ITransactionRequest extends IGetUserAuthInfoRequest {
  params: {
    userId: string;
    transactionId: string;
  };
  query: {
    page: number;
    limit: number;
  };
}

export class TransactionDto {
  public count: number = 0;
  public userId: string = '';
  public category: OptionType = {
    id: '',
    name: '',
  };
  public description: string = '';
  public familyGroup: OptionType = {
    id: '',
    name: '',
  };
  public createdDate: Date = new Date();

  constructor(data?: TransactionDto) {
    if (data) {
      this.count = data.count;
      this.userId = data.userId;
      this.category = data.category;
      this.familyGroup = data.familyGroup;
      this.createdDate = data.createdDate;
      this.description = data.description;
    }
  }
}
