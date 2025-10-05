import * as ApiKeyService from "../services/apiKey.service.js";
import crypto from 'crypto'
export const storeApiKey = async (req, res, next) => {
  try {
    const part1 = crypto.randomBytes(8).toString("hex").substring(0,8);
    const part2 = crypto.randomBytes(8).toString("hex").substring(0,4);
    const part3 = crypto.randomBytes(8).toString("hex").substring(0,4);
    const part4 = crypto.randomBytes(8).toString("hex").substring(0,16)
    const data = await ApiKeyService.storeApiKey(`${part1}-${part2}-${part3}-${part4}`);
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
