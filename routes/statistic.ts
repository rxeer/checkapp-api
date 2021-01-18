import Router from 'koa-router';

import statisticsController from '@/controllers/statistics.controller';

const router = new Router({
  prefix: '/users',
});

router.get('/statistic/income', statisticsController.getIncome);

export default router;
