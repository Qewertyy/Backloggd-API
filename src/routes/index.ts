//Copyright 2023 Qewertyy, MIT License

import { Router, Request, Response } from "express";
const Route = Router();
import {home,user} from '../controllers';

Route
   .use(['/user','/u'], user)
   .use('/', home)
   .use('*', (req: Request, res: Response) => res.status(404).json({ message: "not found", code: 0 }))

export default Route;
