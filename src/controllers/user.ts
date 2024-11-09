//Copyright 2023 Qewertyy, MIT License

import { Router, Request, Response } from "express";
import { getUserInfo } from "../lib/user";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });
const Route = Router();

async function userInfo(req: Request, res: Response) {
  let refresh = false;
  const { username } = req.params;
  if ("refresh" in req.query) refresh = Boolean(req.query.refresh);
  if (!username) {
    return res.status(400).json({
      message: "Username is required",
      code: 0,
      details: "/:username",
    });
  }
  if (refresh) {
    cache.del(username);
  }
  const cachedResponse = cache.get(username);
  if (cachedResponse) {
    return res.status(200).json({
      message: "success",
      code: 2,
      content: cachedResponse,
    });
  }
  const response = await getUserInfo(username);
  if (response.error) {
    return res
      .status(response.status || 500)
      .json({ message: response.error, code: 0 });
  }
  cache.set(username, response);
  res.set("Cache-Control", "public, max-age=3600");
  return res.status(200).json({
    message: "success",
    code: 2,
    content: response,
  });
}

Route.get("/:username", async (req: Request, res: Response) => {
  return await userInfo(req, res);
}).post("/:username", async (req: Request, res: Response) => {
  return await userInfo(req, res);
});

export default Route;
