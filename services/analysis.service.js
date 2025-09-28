import LogModel from "../models/log.model.js";
import { format } from 'date-fns';

export const analysisData = async (apiKey) => {
  const data = await LogModel.find(
    { tracerApiKey: apiKey },
    { _id: 0, statusCode: 1, responseTimeMs: 1,timestamp:1 }
  ).sort({ timestamp: -1 });
  const analysisObj = calculateAnalysisData(data);

  return analysisObj;
};
const calculateAnalysisData = (data) => {
  let aggreagteResponseTime = 0,
    aggregateSuccessfulResponses = 0,
    aggregateErrorresponse = 0,
    timestamp = null;
    let commonErrorMap = {};
    let lineChartData={};
  data?.forEach((el) => {
    aggreagteResponseTime += el?.responseTimeMs;
    const date = format(new Date(el?.timestamp),"dd/MM/yyyy").toString();
    
    const statusCodeFirstChar = `${el.statusCode}`[0];
    if(lineChartData[date]){
         lineChartData[date]=[...lineChartData[date],statusCodeFirstChar];
    }else{
        lineChartData[date] = [statusCodeFirstChar];
    }
    if (["1", "2", "3"].includes(statusCodeFirstChar)) {
      aggregateSuccessfulResponses++;
    } else {
      aggregateErrorresponse++;
      if(!timestamp){
            timestamp=el?.timestamp
        }
      commonErrorMap[el.statusCode]=(commonErrorMap[el.statusCode]??0)+1
    }
  });
  if(Object.keys(commonErrorMap)?.length){
    commonErrorMap =Object.entries(commonErrorMap).sort((a,b)=>b[1]-a[1])[0][0]
  }else{
    commonErrorMap=null
  }
  let formattedChartData = [];
  Object.keys(lineChartData).forEach((key)=>{
    const dayWiseData = lineChartData[key];
    let successCount =0;
    dayWiseData?.forEach((day)=>{
     if(["1", "2", "3"].includes(day)){
        successCount++;
     }
    })
    formattedChartData.push({day:key,uptime:((successCount/dayWiseData?.length)*100).toFixed(2)})
  })
  return {
    totalRequestVolume: data?.length,
    averageResponseTime:(aggreagteResponseTime/data?.length).toFixed(2)+"ms",
    uptimePercentage:((aggregateSuccessfulResponses/data?.length)*100).toFixed(2)+"%",
    errorRate:((aggregateErrorresponse/data?.length)*100).toFixed(2)+"%",
    mostCommonError:commonErrorMap,
    lastDowntimeTimestamp:timestamp,
    formattedChartData:formattedChartData

  }
};
