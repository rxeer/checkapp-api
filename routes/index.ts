import express from 'express';
import userRoutes from './user';
import incomesRoutes from './incomes';
import productsRoutes from './products';
import statisticRoutes from './statistic';
import familyGroupRoutes from './family-group';
import userCategoriesRoutes from './user-categories';

const router = express.Router();

router.use(
  '/users',
  userRoutes,
  productsRoutes,
  incomesRoutes,
  statisticRoutes,
  userCategoriesRoutes,
  familyGroupRoutes
);

export default router;
