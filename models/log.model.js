import { Schema, model } from "mongoose";
const cuvetteMiddlewareLogSchema = new Schema({
  tracerApiKey:{type:String,required:true},
  method:{type:String,default:"GET"},  
  timestamp: { type: Date, required: true },
  apiName: { type: String, required: true },
  statusCode: { type: Number, required: true },
  responseTimeMs: { type: Number, required: true },
  logs: [{ method: { type: String, message: String } }],
});
export default model("cuvetteMiddlewareLog", cuvetteMiddlewareLogSchema);
