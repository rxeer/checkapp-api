import boom from 'boom';
import { Request, Response } from 'express';
import IncomeStatisticsModel from '@/models/IncomeStatistics';

import {
  IncomeStatisticDto,
  IncomeStatisticInterface,
} from '@/@types/models/Statistics';
import { IncomeInterface } from '@/@types/models/Incomes';
import { IGetUserAuthInfoRequest } from '@/@types/models/General';

const getIncome = (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.payload.id;
  return IncomeStatisticsModel.find()
    .exec()
    .then((data: IncomeStatisticInterface[]) => {
      const statistic = data.find(
        (item: IncomeStatisticInterface) => item.userId === userId
      );
      return res.json(
        statistic || new IncomeStatisticDto({ data: [], userId, labels: [] })
      );
    });
};

const updateIncome = (
  incomeId: string,
  { income, date, userId }: IncomeInterface
) => {
  return IncomeStatisticsModel.find().then(
    (statistics: IncomeStatisticInterface[]) => {
      const statistic = statistics.find(
        (item: IncomeStatisticInterface) => item.userId === userId
      );
      statistic?.data.push(income);
      statistic?.labels.push(date);

      return IncomeStatisticsModel.findOneAndUpdate(
        { _id: incomeId },
        //  @ts-ignore
        { $set: new IncomeStatisticDto(statistic) },
        { new: true }
      ).then((user) => {
        if (user) {
          //  @ts-ignore
          return res.json(statistic);
        } else {
        }
      });
    }
  );
};

export default {
  getIncome,
  updateIncome,
};
