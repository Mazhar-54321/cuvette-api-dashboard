import {Schema,model} from 'mongoose';
const requestlimitSchema = new Schema({
    apiName:{type:String,required:true},
    apiKey:{type:String,required:true},
    day:{type:String},
    hour:{type:String},
    hourCount:{type:Number},
    dayCount:{type:Number},
    minuteCount:{type:Number}
})
export default model("requestlimit",requestlimitSchema);