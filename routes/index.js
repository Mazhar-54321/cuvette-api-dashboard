import express from 'express';
import LogRoutes from './logRouter.js';
import ApiRoutes from './apiRoutes.js';
import AnalysisRoutes from './analysisRoutes.js';
import Configroutes from './config.route.js';
import ApiKeyRoutes from './apiKey.route.js';
const router = express.Router();

router.use('/log', LogRoutes);
router.use('/api', ApiRoutes);
router.use('/analysis',AnalysisRoutes);
router.use('/config',Configroutes);
router.use('/apiKey',ApiKeyRoutes)

export default router;
