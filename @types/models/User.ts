import config from 'config';
import { Document } from 'mongoose';

export interface IUserInterface extends Document {
  role: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  created_at: string;
  onboardCompleted: boolean;
  generateJWT: () => string;
  toAuthJSON: () => {
    accessToken: string;
    refreshToken: string;
  };
  setPassword: (password: string) => void;
  getById: (id: string) => IUserInterface | null;
  validatePassword: (password: string) => boolean;
}

export class UserDto {
  public id: string = '';
  public role: string = '';
  public avatar: string = '';
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public createdAt: string = '';
  public onboardCompleted: boolean = false;

  constructor(data?: UserDto) {
    if (data) {
      this.id = data.id;
      this.role = data.role || 'USER';
      this.email = data.email;
      this.onboardCompleted = data.onboardCompleted;
      this.avatar = data.avatar || config.get('avatar');
      this.lastName = data.lastName || '';
      this.firstName = data.firstName || '';
      this.createdAt = data.createdAt;
    }
  }
}
