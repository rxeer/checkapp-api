import { Document } from 'mongoose';

export interface CategoryInterface extends Document {
  name: string;
  description: string;
}

export class CategoryDto {
  public name: string = '';
  public description: string = '';

  constructor(data?: CategoryDto) {
    if (data) {
      this.name = data.name;
      this.description = data.description;
    }
  }
}
