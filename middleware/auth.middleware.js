import { validateApiKey } from "../services/apiKey.service.js"; // adjust path

export async function authMiddleware(req, res, next) {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ error: "Missing API key" });
    }

    const isValid = await validateApiKey(apiKey);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    console.log(apiKey,req.body)
    if(req.body){
    req.body.apiKey = apiKey;
    }else{
        req.body={apiKey:apiKey}
    }
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
