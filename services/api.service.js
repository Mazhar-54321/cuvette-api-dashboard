import LogModel from "../models/log.model.js";
export const getAllApis = async (apiKey,month,year) => {
  const start = new Date(year,month-1, 1);
  const end = new Date(year,month, 0).setHours(23, 59, 59, 999);
  const data = await LogModel.find(
    {
      tracerApiKey: apiKey,
      timestamp: {
        $gte: start,
        $lte: end,
      },
    },
    { statusCode: 1,method:1, timestamp: 1, _id: 0,traceId:1, apiName: 1 }
  )
    .lean()
    .sort({ timestamp: 1 });
  const apisObj = {};
  if (data) {
    data.forEach((doc) => {
      apisObj[doc.apiName] = [...(apisObj[doc.apiName] ?? []), doc];
    });
  }
  Object.keys(apisObj)?.forEach((apiName) => {
    apisObj[apiName] = {
      data: apisObj[apiName].slice(0, 20),
      apiName: apiName,
      pagination: {
        currentPage: 1,
        totalPages: Math.ceil(apisObj[apiName].length / 20),
      },
    };
  });
  return apisObj;
};
export const getApi = async (apiKey, apiName, from, to, page) => {
  const data = await LogModel.find(
    {
      tracerApiKey: apiKey,
      apiName: apiName,
      timestamp: {
        $gte: new Date(from),
        $lte: new Date(to).setHours(23, 59, 59, 999),
      },
    },
    { statusCode: 1,method:1, timestamp: 1, _id: 0, apiName: 1 }
  )
    .lean()
    .sort({ timestamp: 1 })
    .skip((page - 1) * 20)
    .limit(20);
  const apisObj = { data };

  return data;
};

