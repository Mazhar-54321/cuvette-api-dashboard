import * as AnalysisService from '../services/analysis.service.js'
export const getAalysisData = async(req,res,next)=>{
    try {
    const apiKey = req.headers["x-api-key"];
    const sampleApiKey = "abcd1234-ef56-7890-gh12-ijkl345678mn";
    if (apiKey !== sampleApiKey) {
      res.status(404).json({ message: "Unauthorized" });
    } else {
      const data = await AnalysisService.analysisData(apiKey);
      res.status(200).json({ data: data, message: "Analysis data fetched successfully" });
    }
  } catch (err) {
    console.log(err);
    next({ code: 404, message: "Invalid credentials" });
  }
}