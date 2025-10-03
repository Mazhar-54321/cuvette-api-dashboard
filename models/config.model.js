import { Schema, model } from "mongoose";

const logsConfigSchema = new Schema({
  apiKey: { type: String, required: true },  
  apiName: { type: String, required: true },
  aliasName: { type: String, required: true },
  startDate: { type: String },
  startTime:{hh:{type:Number},mm:{type:Number},ss:{type:Number}},
  endTime:{hh:{type:Number},mm:{type:Number},ss:{type:Number}},
  numberOfRequest:{type:Number,default:0},
  rate:{type:String,default:'hour'},
  enabled: { type: Boolean, default: false },
});

export default model("logsConfig", logsConfigSchema);
