import express from 'express';
import userRoutes from './user';
import uploadRoutes from './upload';
import incomesRoutes from './incomes';
import productsRoutes from './products';
import categoriesRoutes from './categories';

const router = express.Router();

router.use('/upload', uploadRoutes);
router.use('/categories', categoriesRoutes);
router.use('/users', userRoutes, productsRoutes, incomesRoutes);

export default router;
