import LogModel from '../models/log.model.js';
import ConfigModel from '../models/config.model.js';
export const addLog = async(log)=>{
  const data = await LogModel.create(log);
  const configData = await ConfigModel.findOne({apiName:log?.apiName,apiKey:log?.tracerApiKey});
  if(!configData){
    await ConfigModel.create({
      apiKey:log?.tracerApiKey,
      apiName:log?.apiName,
      aliasName:log?.apiName,
    })
  }
  return data;
}
export const getAllLogs = async(apiKey)=>{
  const data = await LogModel.find({tracerApiKey:apiKey},{tracerApiKey:0,_id:0}).sort({timestamp:-1});
  return data;
}