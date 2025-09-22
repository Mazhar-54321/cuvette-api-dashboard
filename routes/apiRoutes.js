import express from 'express';
import * as ApiController from '../controllers/api.controller.js';
console.log("spi routes")
const router = express.Router();
router.get('/',ApiController.getApis);
router.get('/:apiName/status?from=YYYY-MM-DD&to=YYYY-MM-DD&page=X',ApiController.getApis)

export default router;