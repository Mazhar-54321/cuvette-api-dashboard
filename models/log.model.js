import { Schema, model } from "mongoose";
const cuvetteMiddlewareLogSchema = new Schema({
  tracerApiKey:{type:String,required:true},
  traceId:{type:String,required:true},
  method:{type:String,default:"GET"},  
  timestamp: { type: Date, required: true },
  apiName: { type: String, required: true },
  statusCode: { type: Number, required: true },
  responseTimeMs: { type: Number, required: true },
  logs:[new Schema({
  timestamp: { type: Date, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
})],
});
export default model("cuvetteMiddlewareLog", cuvetteMiddlewareLogSchema);
