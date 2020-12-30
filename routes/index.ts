import express from 'express';
import userRoutes from './user';
import incomesRoutes from './incomes';
import statisticRoutes from './statistic';
import familyGroupRoutes from './family-group';
import transactionsRoutes from './transactions';
import userCategoriesRoutes from './user-categories';

const router = express.Router();

router.use(
  '/users',
  userRoutes,
  incomesRoutes,
  statisticRoutes,
  userCategoriesRoutes,
  transactionsRoutes,
  familyGroupRoutes
);

export default router;
