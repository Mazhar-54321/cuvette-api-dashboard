import LogModel from "../models/log.model.js";
import ConfigModel from "../models/config.model.js";
import RequestLimitModel from "../models/requestlimit.model.js";
import { endOfDay, format, isWithinInterval, startOfDay } from "date-fns";
export const addLog = async (log) => {
  const configData = await ConfigModel.findOne({
    apiName: log?.apiName,
    apiKey: log?.tracerApiKey,
  });
  if (!configData) {
    await ConfigModel.create({
      apiKey: log?.tracerApiKey,
      apiName: log?.apiName,
      aliasName: log?.apiName,
    });
  } else {
    const { enabled, schedule, numberOfRequest, rate } = configData;
    const range = {
      start: startOfDay(schedule?.start),
      end: endOfDay(schedule?.end),
    };
    const isWithinInterval =isWithinInterval(new Date(),range);
    let requestLimitFilterObj = {
      apiName: log?.apiName,
      apiKey: log?.tracerApiKey,
      day: format(new Date(), "dd/MM/yyyy"),
    };
    if (rate === "hour") {
      requestLimitFilterObj["hour"] = format(new Date(), "hh");
    }
    if (rate === "minute") {
      requestLimitFilterObj["minute"] = format(new Date(), "mm");
    }
    const requestLimitData = await RequestLimitModel.findOne(
      requestLimitFilterObj
    );
    if (!enabled || !requestLimitData) {
      throw { message: "Scheduling is off for this api" };
    } else {
      const { day, hour, hourCount, dayCount, minuteCount } = requestLimitData;
      if(!isWithinInterval){
        throw {message : "Time is not in scheduler range limit"}
      }
      if (rate === "hour") {
        if (hourCount === numberOfRequest) {
          throw { message: "Rate limit exceeded" };
        } else {
          const updateRequestLimit = await RequestLimitModel.findOneAndUpdate(
            requestLimitFilterObj,
            { $set: { hourCount: hourCount + 1 } }
          );
          data =await LogModel.create(log);
        }
      }
      if (rate === "minute") {
        if (minuteCount === numberOfRequest) {
          throw { message: "Rate limit exceeded" };
        } else {
          const updateRequestLimit = await RequestLimitModel.findOneAndUpdate(
            requestLimitFilterObj,
            { $set: { minuteCount: minuteCount + 1 } }
          );
          data = await LogModel.create(log);
        }
      }
      if (rate === "day") {
        if (dayCount === numberOfRequest) {
          throw { message: "Rate limit exceeded" };
        } else {
          const updateRequestLimit = await RequestLimitModel.findOneAndUpdate(
            requestLimitFilterObj,
            { $set: { dayCount: dayCount + 1 } }
          );
          data = await LogModel.create(log);
        }
      }
      return data;
    }
  }
  return data;
};

export const getAllLogs = async (apiKey) => {
  const data = await LogModel.find(
    { tracerApiKey: apiKey },
    { tracerApiKey: 0, _id: 0 }
  ).sort({ timestamp: -1 });
  return data;
};
