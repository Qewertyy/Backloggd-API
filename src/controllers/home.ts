//Copyright 2023 Qewertyy, MIT License

import { Router, Request, Response } from "express";
const Route = Router();

function home(req: Request, res: Response) {
  const response = {
    code:2,
    message:"Unofficial Backloggd API.",
  };
  res.status(200).json(response);
}


Route
  .get('/', (req: Request,res: Response) => {
    return home(req,res);
  })
  .post('/', (req: Request, res: Response) => {
      return home(req,res);
  });

export default Route;