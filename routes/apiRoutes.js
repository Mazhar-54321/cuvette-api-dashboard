import express from 'express';
import * as ApiController from '../controllers/api.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/',authMiddleware,ApiController.getApis);
router.get('/:apiName/status',authMiddleware,ApiController.getApiByName)

export default router;