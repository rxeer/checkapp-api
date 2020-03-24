import express from 'express';
import userRoutes from './user';
import uploadRoutes from './upload';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);

export default router;
