import express from 'express';
import * as ConfigController from '../controllers/config.controller.js';
const router = express.Router();
router.get('/',ConfigController.getConfigData);
router.post('/',ConfigController.saveConfigData);
export default router;