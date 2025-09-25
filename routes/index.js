import express from 'express';
import LogRoutes from './logRouter.js';
import ApiRoutes from './apiRoutes.js';
import AnalysisRoutes from './analysisRoutes.js'
const router = express.Router();

router.use('/log', LogRoutes);
router.use('/api', ApiRoutes);
router.use('/analysis',AnalysisRoutes);

export default router;
