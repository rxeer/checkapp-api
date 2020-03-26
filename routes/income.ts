import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import incomeController from '@/controllers/income.controller';
import incomeStatisticsController from '@/controllers/income-statistics.controller';

const router = promiseRouter();

router
  .route('/')
  .post(
    [
      body('price').exists(),
      body('name')
        .isString()
        .exists()
    ],
    auth.required,
    incomeController.create,
  )
  .get(auth.required, incomeController.get);

router
  .route('/:incomeId')
  .put([param('incomeId').isMongoId()], auth.required, incomeController.update)
  .delete([param('incomeId').isMongoId()], auth.required, incomeController.remove);

router.route('/statistic').get(auth.required, incomeStatisticsController.get);

export default router;
