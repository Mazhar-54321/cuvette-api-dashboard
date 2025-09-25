import { Schema, model } from "mongoose";
const cuvetteMiddlewareLogSchema = new Schema({
  tracerApiKey:{type:String,required:true},
  traceId:{type:String,required:true},
  method:{type:String,default:"GET"},  
  timestamp: { type: Date, required: true },
  apiName: { type: String, required: true },
  statusCode: { type: Number, required: true },
  responseTimeMs: { type: Number, required: true },
  logs: [{timestamp:String, type: String, message: String } ],
});
export default model("cuvetteMiddlewareLog", cuvetteMiddlewareLogSchema);
