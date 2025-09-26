import ConfigModel from "../models/config.model.js";
export const getConfigData = async(apiKey)=>{
  const configData = await ConfigModel.find({apiKey:apiKey},{apiKey:0,_id:0});
  return configData;
}