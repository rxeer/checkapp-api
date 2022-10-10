import { Context } from 'koa';

import { IncomeStatisticDto } from '@/@types/models/Statistics';
import IncomeModel from '@/models/Incomes';
import { IncomeInterface } from '@/@types/models/Incomes';

const getIncome = (ctx: Context) => {
  const userId = ctx.state.user.id;
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

      ctx.body = new IncomeStatisticDto({
        userId,
        data: dataList,
        labels: dataLabels,
        total: totalIncome,
      });
    })
    .catch((err: Error) => ctx.throw(err));
};

export default {
  getIncome,
};
