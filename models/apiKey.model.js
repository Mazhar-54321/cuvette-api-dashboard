import {Schema,model} from 'mongoose';
const apiKeySchema = new Schema({
    key:{type:String,unique:true}
})
export default model("cuvetteApiKey",apiKeySchema);