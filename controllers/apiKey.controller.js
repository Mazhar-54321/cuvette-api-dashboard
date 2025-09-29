import * as ApiKeyService from "../services/apiKey.service.js";
import crypto from 'crypto'
export const storeApiKey = async (req, res, next) => {
  try {
    const data = await ApiKeyService.storeApiKey(crypto.randomBytes(16).toString("hex").substring(0,16));
    res
      .status(200)
      .json({ data: data, message: "Api key stored successfully" });
  } catch (err) {
    next({ code: 404, message: "Invalid credentials" });
  }
};
export const validateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.body.apiKey;
    const data = await ApiKeyService.validateApiKey(apiKey);
    res
      .status(200)
      .json({ data: data, message: "Api key validated successfully" });
  } catch (err) {
    next({ code: 401, message: "Invalid api key" });
  }
};
