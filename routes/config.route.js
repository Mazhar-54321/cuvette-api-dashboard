import express from 'express';
import * as ConfigController from '../controllers/config.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/', authMiddleware,ConfigController.getConfigData);
router.post('/',authMiddleware,ConfigController.saveConfigData);
export default router;