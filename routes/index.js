import express from 'express';
import LogRoutes from './logRouter.js';
import ApiRoutes from './apiRoutes.js';

const router = express.Router();

router.use('/log', LogRoutes);
router.use('/api', ApiRoutes);

export default router;
