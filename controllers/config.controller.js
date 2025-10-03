import { fromZonedTime, toDate  } from 'date-fns-tz';
import * as ConfigService from '../services/config.service.js'
import { format } from 'date-fns';
export const getConfigData = async(req,res,next)=>{
    try {
        const apiKey = req.body.apiKey;
        const data = await ConfigService.getConfigData(apiKey);
          res.status(200).json({ data: data, message: "Analysis data fetched successfully" });
      } catch (err) {
        next({ code: 404, message: "Invalid credentials" });
      }
}
export const saveConfigData = async(req,res,next)=>{
    try {
        const apiKey = req.body.apiKey;
        console.log(req.body);
        if(req.body.startDate){
          console.log(format(new Date(req.body.startDate),"dd/MM/yyyy HH:mm:ss"))
          req.body.startDate =toDate((req.body.startDate), { timeZone: "Asia/Kolkata" })
        }
        console.log(req.body.startDate)
        const data = await ConfigService.saveConfigData(apiKey,req.body);
          console.log(data)
          res.status(200).json({ data: data, message: "Config data updated successfully" });
      } catch (err) {
        console.log(err);
        next({ code: 404, message: err.message });
      }
}