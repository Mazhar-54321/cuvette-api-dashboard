import LogModel from '../models/log.model.js'
export const addLog = async(logs)=>{
  const data = await LogModel.create(logs);
  return data;
}
export const getAllLogs = async(apiKey)=>{
  const data = await LogModel.find({tracerApiKey:apiKey},{tracerApiKey:0,_id:0});
  return data;
}