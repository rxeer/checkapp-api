import { Document } from 'mongoose';
import { IGetUserAuthInfoRequest } from './General';

export interface IProductInterface extends Document {
  count: number;
  userId: string;
  categoryId: string;
  description: string;
  familyGroupId: string;
  createdDate: Date;
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
  public categoryId: string = '';
  public description: string = '';
  public familyGroupId: string = '';
  public createdDate: Date = new Date();

  constructor(data?: ProductDto) {
    if (data) {
      this.count = data.count;
      this.userId = data.userId;
      this.familyGroupId = data.familyGroupId;
      this.categoryId = data.categoryId;
      this.createdDate = data.createdDate;
      this.description = data.description;
    }
  }
}
