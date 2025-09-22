import LogModel from '../models/log.model.js'
export const addLog = async(logs)=>{
  console.log(logs)
  const data = await LogModel.create(logs);
  return data;
}