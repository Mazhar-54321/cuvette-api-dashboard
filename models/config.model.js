import { Schema, model } from "mongoose";
const logsConfigSchema = new Schema({
  apiKey:{type:String,required:true},  
  apiName: { type: String, required: true },
  aliasName: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  schedule: new Schema({
    start: { type: Date, default: Date.now },
    end: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  }),
  requestLimit: new Schema({
    hour: { type: Number, default: 100 },
    day: { type: Number, default: 2400 },
  }),
  enabled: { type: Boolean, default: true },
});
export default model("logsConfig", logsConfigSchema);
