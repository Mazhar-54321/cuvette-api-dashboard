import express from 'express';
import * as ConfigController from '../controllers/config.controller.js';
const router = express.Router();
router.get('/',ConfigController.getConfigData);
export default router;