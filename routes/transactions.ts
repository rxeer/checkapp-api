import promiseRouter from 'express-promise-router';
import { body, param } from 'express-validator/check';

import auth from './auth';
import transactionsController from '@/controllers/transactions.controller';

const router = promiseRouter();

router.route('/:userId/transactions').post(
  [
    body('createdDate').isString().exists(),
    body('count').isString().exists(),
    body('category').exists(),
    body('familyGroup').exists(),
  ],
  auth.required,
  //  @ts-ignore
  transactionsController.create
);

router
  .route('/:userId/transactions')
  //  @ts-ignore
  .get(auth.required, transactionsController.get);

router
  .route('/:userId/transactions/statistic')
  //  @ts-ignore
  .get(auth.required, transactionsController.getAll);

router
  .route('/:userId/transactions/:transactionId')
  .put(
    [param('transactionId').isMongoId()],
    auth.required,
    //  @ts-ignore
    transactionsController.update
  )
  .delete(
    [param('transactionId').isMongoId()],
    auth.required,
    //  @ts-ignore
    transactionsController.remove
  );

export default router;
