import express, { json } from 'express';
import { config } from 'dotenv';
import routes from './routes/index.js';
import database from './config/database.js';
database();
config();
const app = express();
app.use(json())
app.use('/', routes);
app.use((err,req,res,next)=>{
    console.log(err,"mmnmnmn");
    next()
})
app.listen(8767,()=>{
    console.log('server started at 8767')
})