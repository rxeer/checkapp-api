import express from 'express';
import userRoutes from './user';
import uploadRoutes from './upload';
import incomesRoutes from './incomes';
import productsRoutes from './products';
import familyGroupRoutes from './family-group';
import userCategoriesRoutes from './user-categories';

const router = express.Router();

router.use('/upload', uploadRoutes);
router.use(
  '/users',
  userRoutes,
  productsRoutes,
  incomesRoutes,
  userCategoriesRoutes,
  familyGroupRoutes
);

export default router;
