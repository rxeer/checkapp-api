import boom from 'boom';
import { Request, Response } from 'express';
import IncomeStatisticsModel from '@/models/IncomeStatistics';

import {
  IncomeStatisticDto,
  IncomeStatisticInterface,
} from '@/@types/models/Statistics';
import { IncomeInterface } from '@/@types/models/Incomes';

const getIncome = (req: Request, res: Response) => {
  return IncomeStatisticsModel.find()
    .exec()
    .then((data: IncomeStatisticInterface[]) => {
      return res.send(
        data
          ? data[data.length - 1]
          : new IncomeStatisticDto({ labels: [], data: [] })
      );
    });
};

const updateIncome = ({ income, date }: IncomeInterface) => {
  return IncomeStatisticsModel.find().then(
    (statistics: IncomeStatisticInterface[]) => {
      const currentStatistics: IncomeStatisticInterface =
        statistics[statistics.length - 1] || {};
      const data: number[] = currentStatistics.data || [];
      const labels: Date[] = currentStatistics.labels || [];

      labels.push(date);
      data.push(income);

      return IncomeStatisticsModel.create({ data, labels }).catch((err) => {
        throw boom.notFound(err);
      });
    }
  );
};

const getOutcome = (req: Request, res: Response) => {
  return IncomeStatisticsModel.find()
    .exec()
    .then((data: IncomeStatisticInterface[]) => {
      return res.send(
        data
          ? data[data.length - 1]
          : new IncomeStatisticDto({ labels: [], data: [] })
      );
    });
};

const updateOutcome = ({ income, date }: IncomeInterface) => {
  return IncomeStatisticsModel.find().then(
    (statistics: IncomeStatisticInterface[]) => {
      const currentStatistics: IncomeStatisticInterface =
        statistics[statistics.length - 1] || {};
      const data: number[] = currentStatistics.data || [];
      const labels: Date[] = currentStatistics.labels || [];

      labels.push(date);
      data.push(income);

      return IncomeStatisticsModel.create({ data, labels }).catch((err) => {
        throw boom.notFound(err);
      });
    }
  );
};

export default {
  getIncome,
  getOutcome,
  updateIncome,
  updateOutcome,
};
