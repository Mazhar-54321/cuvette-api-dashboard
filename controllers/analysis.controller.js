import * as AnalysisService from "../services/analysis.service.js";
export const getAalysisData = async (req, res, next) => {
  try {
    const apiKey = req.body.apiKey;
    const data = await AnalysisService.analysisData(apiKey);
    res
      .status(200)
      .json({ data: data, message: "Analysis data fetched successfully" });
  } catch (err) {
    next({ code: 404, message: "Invalid credentials" });
  }
};
