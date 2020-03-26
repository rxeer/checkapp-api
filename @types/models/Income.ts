import { Document } from 'mongoose';

export interface IncomeInterface extends Document {
	date: Date,
	name: string,
	price: number,
	description: string,
}

export class IncomeDto {
  public name: string = '';
  public price: number = 0;
  public date: Date = new Date();
  public description: string = '';

  constructor(data?: IncomeDto) {
    if (data) {
      this.name = data.name;
			this.date = data.date;
      this.price = data.price;
      this.description = data.description;
    }
  }
}
