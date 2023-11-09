import { Request, Response } from "express";
import Mongo from "../utils/mongoose";

export default class ModelService {
  public async fileUpload(req: Request, res: Response) {
    console.log(req.files)

    return res.status(201).json({
      success: true
    });
  }
}
