import Koa from 'koa';
import Router from 'koa-router';

import userRoutes from './user';
import incomesRoutes from './incomes';
import statisticRoutes from './statistic';
import familyGroupRoutes from './family-group';
import transactionsRoutes from './transactions';
import userCategoriesRoutes from './user-categories';

const router = new Router({
  prefix: '/api/v1'
});

const setAppRoutes = (app: Koa) => {
  app.use(userRoutes.routes());
  app.use(incomesRoutes.routes());
  app.use(statisticRoutes.routes());
  app.use(familyGroupRoutes.routes());
  app.use(transactionsRoutes.routes());
  app.use(userCategoriesRoutes.routes());
  app.use(
    router.allowedMethods({
      throw: true,
      notImplemented: () => {
        throw new Error('Not Implemented');
      },
      methodNotAllowed: () => {
        throw new Error('Method Not Allowed');
      },
    })
  );
};

export default setAppRoutes;
