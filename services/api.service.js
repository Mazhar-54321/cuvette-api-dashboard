import LogModel from "../models/log.model.js";
export const getAllApis = async (apiKey) => {
  const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const end = new Date();
  const data = await LogModel.find({
    tracerApiKey: apiKey,
    timestamp: {
      $gte: start,
      $lte: end,
    },
  },{statusCode:1,timestamp:1,_id:0,apiName:1}).lean().sort({timestamp:1});
  const apisObj = {};
  if (data) {
    data.forEach((doc) => {
      apisObj[doc.apiName] = [
        ...(apisObj[doc.apiName] ?? []),
        doc,
      ];
    });
  }
  Object.keys(apisObj)?.forEach((apiName) => {
    apisObj[apiName] = {
      data: apisObj[apiName].slice(0, 20),
      pagination: {
        currentPage: 1,
        totalPages: Math.ceil(apisObj[apiName].length / 20),
      },
    };
  });
  return apisObj;
};
