import LogModel from "../models/log.model.js";
import ConfigModel from "../models/config.model.js";
import RequestLimitModel from "../models/requestlimit.model.js";
import {
  format,
  getHours,
  getMinutes,
  getSeconds,
  isEqual,
} from "date-fns";

export const addLog = async (log) => {
  const configData = await ConfigModel.findOne({
    apiName: log?.apiName,
    apiKey: log?.tracerApiKey,
  });
  let data = {};
  if (!configData) {
    await ConfigModel.create({
      apiKey: log?.tracerApiKey,
      apiName: log?.apiName,
      aliasName: log?.apiName,
    });
  } else {
    const { enabled, startDate, numberOfRequest, rate, startTime, endTime } =
      configData;
    const isWithinRange = isEqual(startDate, new Date().toISOString());
    let requestLimitFilterObj = {
      apiName: log?.apiName,
      apiKey: log?.tracerApiKey,
      day: format(new Date(), "dd/MM/yyyy"),
    };
    if (rate === "hour") {
      requestLimitFilterObj["hour"] = format(new Date(), "H");
    }
    if (rate === "minute") {
      requestLimitFilterObj["hour"] = format(new Date(), "H");
      requestLimitFilterObj["minute"] = format(new Date(), "m");
    }
    const requestLimitData = await RequestLimitModel.findOne(
      requestLimitFilterObj
    );

    if (!enabled) {
      throw { message: "Scheduling is off for this api" };
    } else {
      const {
        hourCount = 0,
        dayCount = 0,
        minuteCount = 0,
      } = requestLimitData ?? { hourCount: 0, dayCount: 0, minuteCount: 0 };
      if (!isWithinRange) {
        throw { message: "Time is not in scheduler range limit" };
      }
      const date = new Date();
      const hours = getHours(date);
      const mins = getMinutes(date);
      const secs = getSeconds(date);
      if (
        !(toSeconds(hours, mins, secs) >=
          toSeconds(startTime?.hh, startTime?.mm, startTime?.ss) &&
        toSeconds(hours, mins, secs) <=
          toSeconds(endTime?.hh, endTime?.mm, endTime?.ss))
      ){
 throw { message: "Time is not in scheduler range limit" };
      }
        if (rate === "hour") {
          if (hourCount === numberOfRequest) {
            throw { message: "Rate limit exceeded" };
          } else {
            await updateRequestModel(
              requestLimitFilterObj,
              { hourCount: 1 },
              log
            );
          }
        }
      if (rate === "minute") {
        if (minuteCount === numberOfRequest) {
          throw { message: "Rate limit exceeded" };
        } else {
          await updateRequestModel(
            requestLimitFilterObj,
            { minuteCount: 1 },
            log
          );
        }
      }
      if (rate === "day") {
        if (dayCount === numberOfRequest) {
          throw { message: "Rate limit exceeded" };
        } else {
          await updateRequestModel(requestLimitFilterObj, { dayCount: 1 }, log);
        }
      }
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

const updateRequestModel = async (filterObj, incObj, log) => {
  await RequestLimitModel.findOneAndUpdate(
    filterObj,
    {
      $inc: incObj,
      $setOnInsert: filterObj,
    },
    { upsert: true, new: true }
  );
  await LogModel.create(log);
};
function toSeconds(hh, mm, ss) {
  return Number(hh) * 3600 + Number(mm) * 60 + Number(ss);
}
