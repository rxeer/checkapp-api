import Koa from 'koa';
import Router from 'koa-router';

import userRoutes from './user';
import incomesRoutes from './incomes';
import statisticRoutes from './statistic';
import familyGroupRoutes from './family-group';
import transactionsRoutes from './transactions';
import userCategoriesRoutes from './user-categories';

const router = new Router();

const setAppRoutes = (app: Koa) => {
  app.use(userRoutes.routes());
  app.use(incomesRoutes.routes());
  app.use(statisticRoutes.routes());
  app.use(familyGroupRoutes.routes());
  app.use(transactionsRoutes.routes());
  app.use(userCategoriesRoutes.routes());
  app.use(router.allowedMethods());
};

export default setAppRoutes;
