import { Request, Response } from "express";

export default class AppService {
  public async getStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    return res.status(200).send({
      status: true,
      internetProtocol: req.ip
    });
  }
}
