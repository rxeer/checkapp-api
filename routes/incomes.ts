import Router from 'koa-router';
import incomesController from '@/controllers/incomes.controller';

var router = new Router({
  prefix: '/api/v1/users',
});

router
  .post('/:userId/incomes', incomesController.create)
  .get('/:userId/incomes', incomesController.get);

router
  .put('/:userId/incomes/:incomeId', incomesController.update)
  .delete('/:userId/incomes/:incomeId', incomesController.remove);

export default router;
