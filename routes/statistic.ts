import promiseRouter from 'express-promise-router';

import auth from './auth';
import statisticsController from '@/controllers/statistics.controller';

const router = promiseRouter();

router
  .route('/statistic/income')
  .get(auth.required, statisticsController.getIncome);

router
  .route('/statistic/outcome')
  .get(auth.required, statisticsController.getOutcome);

export default router;
