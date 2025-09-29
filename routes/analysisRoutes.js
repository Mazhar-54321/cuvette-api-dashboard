import express from 'express';
import * as AnalysisController from '../controllers/analysis.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/', authMiddleware,AnalysisController.getAalysisData);
export default router;