import boom from 'boom';
import { Response } from 'express';

import { IncomeStatisticDto } from '@/@types/models/Statistics';
import IncomeModel from '@/models/Incomes';
import { IncomeInterface } from '@/@types/models/Incomes';
import { IGetUserAuthInfoRequest } from '@/@types/models/General';

const getIncome = (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.payload.id;
  return IncomeModel.find()
    .sort({ created_at: 'desc' })
    .exec()
    .then((data: IncomeInterface[]) => {
      const list = data.filter(
        (item: IncomeInterface) => item.userId === userId
      );
      const dataList = list.map((a: IncomeInterface): number => a.income);
      const dataLabels = list.map((a: IncomeInterface): Date => a.date);
      const totalIncome = dataList.reduce((a: number, item: number): number => {
        return a + item;
      }, 0);

      res.json(
        new IncomeStatisticDto({
          userId,
          data: dataList,
          labels: dataLabels,
          total: totalIncome,
        })
      );
    })
    .catch((err: Error) => res.json(boom.notFound(`${err}`)));
};

export default {
  getIncome,
};
