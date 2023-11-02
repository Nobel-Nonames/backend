import { Router } from "express";
import ModelService from "./model.service";

export class ModelController {
  private router: Router = Router();
  private readonly modelService: ModelService = new ModelService();

  constructor(prefix: string) {
    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.post(`${prefix}/fileUpload`, (req, res) => this.modelService.fileUpload(req, res))
  }

  public getRouter(): Router {
    return this.router;
  }
}
