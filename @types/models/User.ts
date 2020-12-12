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
      this.avatar =
        'https://firebasestorage.googleapis.com/v0/b/icheck-ce8b6.appspot.com/o/Mask%20Group.png?alt=media&token=c79ddad1-fcfa-4a17-a910-49a4f478eabf' ||
        config.get('avatar');
      this.lastName = data.lastName || '';
      this.firstName = data.firstName || '';
      this.createdAt = data.createdAt;
    }
  }
}
