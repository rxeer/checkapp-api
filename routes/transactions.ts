import Router from 'koa-router';

import transactionsController from '@/controllers/transactions.controller';

const router = new Router({
  prefix: '/users',
});

router
  .post('/:userId/transactions', transactionsController.create)
  .get('/:userId/transactions', transactionsController.get);

router.get('/:userId/transactions/statistic', transactionsController.getAll);

router
  .put('/:userId/transactions/:transactionId', transactionsController.update)
  .delete(
    '/:userId/transactions/:transactionId',
    transactionsController.remove
  );

export default router;
