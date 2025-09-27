import * as ConfigService from '../services/config.service.js'
export const getConfigData = async(req,res,next)=>{
    try {
        const apiKey = req.headers["x-api-key"];
        const sampleApiKey = "abcd1234-ef56-7890-gh12-ijkl345678mn";
        if (apiKey !== sampleApiKey) {
          res.status(404).json({ message: "Unauthorized" });
        } else {
          const data = await ConfigService.getConfigData(apiKey);
          res.status(200).json({ data: data, message: "Analysis data fetched successfully" });
        }
      } catch (err) {
        console.log(err);
        next({ code: 404, message: "Invalid credentials" });
      }
}
export const saveConfigData = async(req,res,next)=>{
    try {
        const apiKey = req.headers["x-api-key"];
        const sampleApiKey = "abcd1234-ef56-7890-gh12-ijkl345678mn";
        if (apiKey !== sampleApiKey) {
          res.status(404).json({ message: "Unauthorized" });
        } else {
           
          const data = await ConfigService.saveConfigData(apiKey,req.body);
          res.status(200).json({ data: data, message: "Config data updated successfully" });
        }
      } catch (err) {
        console.log(err);
        next({ code: 404, message: err.message });
      }
}