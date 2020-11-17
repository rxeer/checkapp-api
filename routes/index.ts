import express from 'express';
import userRoutes from './user';
import uploadRoutes from './upload';
import incomeRoutes from './income';
import productsRoutes from './products';
import categoriesRoutes from './categories';

const router = express.Router();

router.use('/users', userRoutes, productsRoutes);
router.use('/income', incomeRoutes);
router.use('/upload', uploadRoutes);
router.use('/categories', categoriesRoutes);

export default router;
