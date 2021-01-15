import Router from 'koa-router';

import statisticsController from '@/controllers/statistics.controller';

var router = new Router({
  prefix: '/api/v1/users',
});

router.get('/statistic/income', statisticsController.getIncome);

export default router;
