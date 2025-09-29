import * as LogServices from "../services/log.service.js";
export const addLog = async (req, res, next) => {
  try {
    const apiKey = req.body.apiKey;
    const {
      timestamp,
      apiName,
      statusCode,
      responseTimeMs,
      method,
      traceId,
      logs = [],
    } = req.body;
    if (!timestamp || !apiName || !statusCode || !responseTimeMs) {
      res.status(404).json({ message: "Unauthorized" });
      return;
    }

    const logObj = {
      timestamp,
      apiName,
      statusCode,
      responseTimeMs,
      logs,
      method,
      traceId,
      tracerApiKey: apiKey,
    };
    const data = await LogServices.addLog(logObj);
    res.status(200).json({ message: "Log Added successfully" });
  } catch (err) {
    next({ code: 404, message: "Invalid credentials" });
  }
};
export const getAllLogs = async (req, res, next) => {
  try {
    const apiKey = req.body.apiKey;
    const data = await LogServices.getAllLogs(apiKey);
    res.status(200).json({ data: data, message: "Logs Fetched successfully" });
  } catch (err) {
    next({ code: 404, message: "Invalid credentials" });
  }
};
