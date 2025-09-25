import * as LogServices from "../services/log.service.js";
export const addLog = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    const sampleApiKey = "abcd1234-ef56-7890-gh12-ijkl345678mn";
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
    if (apiKey !== sampleApiKey) {
      res.status(404).json({ message: "Unauthorized" });
    } else {
      const data = await LogServices.addLog(logObj);
      res.status(200).json({ data: data, message: "Log Added successfully" });
    }
  } catch (err) {
    console.log(err);
    next({ code: 404, message: "Invalid credentials" });
  }
};
export const getAllLogs = async(req,res,next)=>{
    try {
    const apiKey = req.headers["x-api-key"];
    const sampleApiKey = "abcd1234-ef56-7890-gh12-ijkl345678mn";
    if (apiKey !== sampleApiKey) {
      res.status(404).json({ message: "Unauthorized" });
    } else {
      const data = await LogServices.getAllLogs(apiKey);
      res.status(200).json({ data: data, message: "Logs Fetched successfully" });
    }
  } catch (err) {
    console.log(err);
    next({ code: 404, message: "Invalid credentials" });
  }
}
