import express from 'express';
import * as LogController from '../controllers/log.controller.js';
const router = express.Router();
router.post('/',LogController.addLog);
router.get('/',LogController.getAllLogs);
export default router;