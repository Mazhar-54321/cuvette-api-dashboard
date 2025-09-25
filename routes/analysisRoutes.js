import express from 'express';
import * as AnalysisController from '../controllers/analysis.controller.js';
const router = express.Router();
router.get('/',AnalysisController.getAalysisData);
export default router;