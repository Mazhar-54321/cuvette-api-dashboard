import express, { json } from 'express';
import { config } from 'dotenv';
import routes from './routes/index.js';
routes();
config();
const app = express();
app.use(json())
app.listen(8767,()=>{
    console.log('server started at 8767')
})