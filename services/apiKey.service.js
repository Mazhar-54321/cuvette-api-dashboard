import ApiKeyModel from "../models/apiKey.model.js";
export const storeApiKey = async (apiKey)=>{
    const data = await ApiKeyModel.create({key:apiKey});
    return data;
}
export const validateApiKey = async(apiKey)=>{
    const data = await ApiKeyModel.findOne({key:apiKey});
    if(!data){
        throw {message:'Invalid api key'}
    }
    return data;
}