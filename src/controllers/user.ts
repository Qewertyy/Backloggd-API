//Copyright 2023 Qewertyy, MIT License

import { Router, Request, Response } from "express";
import { getUserInfo } from "../lib/user";
const Route = Router();

async function userInfo(req: Request, res: Response) {
  const { username } = req.params;
  if (!username) {
    return res
      .status(400)
      .json({
        message: "Username is required",
        code: 0,
        details: "/:username",
      });
  }
  const response = await getUserInfo(username);
  if (response.error) {
    return res
      .status(response.status || 500)
      .json({ message: response.error, code: 0 });
  }
  return res.status(200).json({
    message: "success",
    code: 2,
    content: response,
  });
}

Route
    .get("/:username", async (req: Request, res: Response) => {
        return await userInfo(req, res);
    }).post("/:username", async (req: Request, res: Response) => {
        return await userInfo(req, res);
    });

export default Route;
