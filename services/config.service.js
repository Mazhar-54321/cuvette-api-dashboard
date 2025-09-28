import ConfigModel from "../models/config.model.js";
export const getConfigData = async(apiKey)=>{
  const configData = await ConfigModel.find({apiKey:apiKey},{apiKey:0,_id:0});
  return configData;
}
export const saveConfigData =  async(apiKey,data)=>{
 const configCheckForDuplicate = await ConfigModel.findOne({aliasName:data?.aliasName});
 if(configCheckForDuplicate && configCheckForDuplicate?.apiName !== data?.apiName){
  throw {message:'Duplicate Api Name'}
 } 
 const configData = await ConfigModel.findOneAndUpdate({apiKey:apiKey,apiName:data?.apiName},{$set:data},{new:true,projection:{_id:0,apiKey:0}});
 return configData;
}