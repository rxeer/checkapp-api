import config from 'config';
import { Document } from 'mongoose';

export interface UserInterface extends Document {
  role: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  created_at: string;
  generateJWT: Function;
  toAuthJSON: Function;
  setPassword: (password: string) => void;
  getById: (id: string) => UserInterface | null;
  validatePassword: (password: string) => boolean;
}

export class UserDto {
  public role: string = '';
  public avatar: string = '';
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public created_at: string = '';

  constructor(data?: UserDto) {
    if (data) {
      this.role = data.role;
      this.email = data.email;
      this.avatar = data.avatar || config.get('avatar');
      this.lastName = data.lastName || '';
      this.firstName = data.firstName || '';
      this.created_at = data.created_at;
    }
  }
}
