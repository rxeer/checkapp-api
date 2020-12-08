import promiseRouter from 'express-promise-router';

import auth from './auth';
import statisticsController from '@/controllers/statistics.controller';

const router = promiseRouter();

router
  .route('/statistic/income')
  //  @ts-ignore
  .get(auth.required, statisticsController.getIncome);

export default router;
