import { Document } from 'mongoose';
import { IGetUserAuthInfoRequest } from './General';

export interface IUserCategoryInterface extends Document {
  name: string;
  userId: string;
  createdAt: Date;
  description: string;
}

export interface IUserCategoriesRequest extends IGetUserAuthInfoRequest {
  params: {
    userId: string;
    categoryId: string;
  };
}

export class IUserCategoryDto {
  public name: string = '';
  public userId: string = '';
  public description: string = '';
  public createdAt: Date = new Date();

  constructor(data?: IUserCategoryDto) {
    if (data) {
      this.name = data.name;
      this.userId = data.userId;
      this.createdAt = data.createdAt;
      this.description = data.description;
    }
  }
}
