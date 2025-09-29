import * as ApiService from "../services/api.service.js";
export const getApis = async (req, res, next) => {
  try {
    const sampleApiKey = req.body.apiKey;
    const { month, year } = req.query;
    const data = await ApiService.getAllApis(sampleApiKey, month, year);
    res.status(200).json({ data: data, message: "Apis fetched successfully" });
  } catch (err) {
    next({ code: 404, message: "Invalid credentials" });
  }
};
export const getApiByName = async (req, res, next) => {
  const { apiName } = req.params;
  const { from, to, page } = req.query;
  try {
    const sampleApiKey = req.body.apiKey;
    const data = await ApiService.getApi(
      sampleApiKey,
      atob(apiName),
      from,
      to,
      page
    );
    res.status(200).json({ data, message: "Api data fetched successfully" });
  } catch (err) {
    next({ code: 404, message: "Invalid credentials" });
  }
};
