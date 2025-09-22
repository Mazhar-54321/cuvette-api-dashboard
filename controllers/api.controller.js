import * as ApiService from '../services/api.service.js';
export const getApis = async (req, res, next) => {
  try {
    const sampleApiKey = "abcd1234-ef56-7890-gh12-ijkl345678mn";
    console.log(sampleApiKey)
      const data = await ApiService.getAllApis(sampleApiKey);
      res.status(200).json({ data: data, message: "Apis fetched successfully" });
    
  } catch (err) {
    console.log(err)
    next({ code: 404, message: "Invalid credentials" });
  }
};
