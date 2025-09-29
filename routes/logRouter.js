import express from 'express';
import * as LogController from '../controllers/log.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();
router.post('/',authMiddleware,LogController.addLog);
router.get('/',authMiddleware,LogController.getAllLogs);
export default router;