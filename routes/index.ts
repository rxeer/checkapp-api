import express from 'express';
import userRoutes from './user';
import uploadRoutes from './upload';
import incomeRoutes from './income';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/income', incomeRoutes);
router.use('/upload', uploadRoutes);

export default router;
