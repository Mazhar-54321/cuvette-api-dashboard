import express from 'express';
import LogRoutes from './logRouter.js';
const router = express.Router();
const routes =()=>{
    router.use('/log',LogRoutes)
    return router;
}
export default routes;