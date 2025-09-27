import { Schema, model } from "mongoose";

const logsConfigSchema = new Schema({
  apiKey: { type: String, required: true },  
  apiName: { type: String, required: true },
  aliasName: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  schedule: {
    start: { type: Date, default: Date.now },
    end: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
    },
  },
  numberOfRequest:{type:Number,default:0},
  rate:{type:String,default:'hour'},
  
  enabled: { type: Boolean, default: false },
});

export default model("logsConfig", logsConfigSchema);
