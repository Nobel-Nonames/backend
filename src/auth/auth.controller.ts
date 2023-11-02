import { Router } from "express";
import AuthService from "./auth.service";

export class AuthController {
  private router: Router = Router();
  private readonly authService: AuthService = new AuthService();

  constructor(prefix: string) {
    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.post(`${prefix}/login`, (req, res) => this.authService.login(req, res))
    this.router.post(`${prefix}/signUp`, (req, res) => this.authService.signUp(req, res))
  }

  public getRouter(): Router {
    return this.router;
  }
}
