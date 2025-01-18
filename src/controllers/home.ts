//Copyright 2023 Qewertyy, MIT License

import { Router, Request, Response } from "express";
import { repository } from "../../package.json";
const Route = Router();

function home(req: Request, res: Response) {
  const response = {
    code:2,
    message:"Unofficial Backloggd API.",
    source:repository.url
  };
  res.status(200).json(response);
};


Route
  .get('/', (req: Request,res: Response) => {
    return home(req,res);
  })
  .post('/', (req: Request, res: Response) => {
      return home(req,res);
  });

export default Route;