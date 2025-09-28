import express from 'express';
import * as ApiController from '../controllers/api.controller.js';
const router = express.Router();
router.get('/',ApiController.getApis);
router.get('/:apiName/status',ApiController.getApiByName)

export default router;