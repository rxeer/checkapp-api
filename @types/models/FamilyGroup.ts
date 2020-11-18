import { Document } from 'mongoose';
import { IGetUserAuthInfoRequest } from './General';

export interface IFamilyGroupInterface extends Document {
  name: string;
  userId: string;
}

export interface IFamilyGroupRequest extends IGetUserAuthInfoRequest {
  params: {
    userId: string;
    familyId: string;
  };
}

export class FamilyGroupDto {
  public name: number = 0;
  public userId: string = '';

  constructor(data?: FamilyGroupDto) {
    if (data) {
      this.name = data.name;
      this.userId = data.userId;
    }
  }
}
