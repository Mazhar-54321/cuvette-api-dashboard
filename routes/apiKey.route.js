import express from 'express';
import * as ApiKeyController from '../controllers/apiKey.controller.js';
const router = express.Router();
router.get('/',ApiKeyController.storeApiKey);
router.post('/',ApiKeyController.validateApiKey);
export default router;