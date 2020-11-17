import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import incomesController from '@/controllers/incomes.controller';
import incomeStatisticsController from '@/controllers/income-statistics.controller';

const router = promiseRouter();

//  @ts-ignore
router
  .route('/:userId/incomes')
  .post(
    [
      body('date').exists(),
      body('income').exists(),
      body('description').isString().exists(),
    ],
    auth.required,
    incomesController.create
  )
  .get(auth.required, incomesController.get);

//  @ts-ignore
router
  .route('/:userId/incomes/:incomeId')
  .put([param('incomeId').isMongoId()], auth.required, incomesController.update)
  .delete(
    [param('incomeId').isMongoId()],
    auth.required,
    incomesController.remove
  );

router.route('/statistic').get(auth.required, incomeStatisticsController.get);

export default router;
