import { Document } from 'mongoose';
import { IGetUserAuthInfoRequest } from './General';

export interface ICategoryInterface extends Document {
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

export class ICategoryDto {
  public name: string = '';
  public userId: string = '';
  public description: string = '';
  public createdAt: Date = new Date();

  constructor(data?: ICategoryDto) {
    if (data) {
      this.name = data.name;
      this.userId = data.userId;
      this.createdAt = data.createdAt;
      this.description = data.description;
    }
  }
}
