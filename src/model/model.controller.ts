import { Router } from "express";
import ModelService from "./model.service";
import MulterUtils from "../utils/multerUtils";
import multer from "multer";
import path from "path";
import jsonwebtoken from "../utils/jsonwebtoken";
import Mongo from "../utils/mongoose";
import authModel from "../entities/auth.entity";

export class ModelController {
  private router: Router = Router();
  private readonly modelService: ModelService = new ModelService();
  private readonly Multer: multer.Multer;

  constructor(prefix: string) {
    this.Multer = new MulterUtils({
      cbFunction: async (req, file, callback) => {
        const token = req.headers.authorization;
        const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await new Mongo().findOne(authModel, {
          _id: verify.uuid
        })

        if (!token || !verify.success || !user)
          return callback(new Error('비 정상적인 토큰 입니다.'), 'public/trash');
        else {
          return callback(null, `public/tmp/${user.username}/tp`);
        }
      },
      filter: async (req, file, callback) => {
        const token = req.headers.authorization;
        const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await new Mongo().findOne(authModel, {
          _id: verify.uuid
        })

        if (!token || !verify.success || !user)
          return callback(null, false)
        else {
          return callback(null, true)
        }
      }
    }, ['image/png', 'image/jpeg'], 120).getMulter();

    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.post(`${prefix}/upload`, this.Multer.array('file', 30), (req, res) => this.modelService.fileUpload(req, res))
  }

  public getRouter(): Router {
    return this.router;
  }
}
