import { Document } from 'mongoose';
import { IGetUserAuthInfoRequest } from './General';

type OptionType = {
  id: string;
  name: string;
};
export interface IProductInterface extends Document {
  count: number;
  userId: string;
  createdDate: Date;
  description: string;
  category: OptionType;
  familyGroup: OptionType;
}

export interface IProductsRequest extends IGetUserAuthInfoRequest {
  params: {
    userId: string;
    productId: string;
  };
}

export class ProductDto {
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

  constructor(data?: ProductDto) {
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
