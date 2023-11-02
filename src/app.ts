import * as express from 'express';
import * as skio from 'socket.io'
import { AppController } from './app/app.controller';
import SocketTerminal from './socket/socket.terminal';
import { AuthController } from './auth/auth.controller';

const SocketCors = {
  origin: '*',
  methods: ['GET', 'POST']
}

const controllers = [new AppController('/'), new AuthController('/auth')]

export default class App {
  public router: express.Application;
  public io: skio.Server | undefined;

  constructor(app: express.Application) {
    this.router = app;
    this.controllerInit();
    this.start();
    this.socketInit();
  }

  private controllerInit(): void {
    try {
      controllers.forEach((controller) => {
        const controllerRouter: express.Router = controller.getRouter();
        this.router.use('/api', controllerRouter);
      })
    } catch (err) {
      console.error('[Express] Controller Init Error:' + err)
      return process.exit(1);
    }

    console.log("[Express] Controller Init Success");
  }

  private socketInit(): void {
    this.io?.on('connection', (socket: skio.Socket) => {
      new SocketTerminal(socket);
    })
  }

  private start(): void {
    console.log(
      '\x1b[0m' + '<--------------------------------->\n' +
      '<--------------------------------->\x1b[32m'
    )
    const express_server = this.router.listen(process.env.PORT ?? 3000, () => {
      console.log(`[Express] Server is running on port: [${process.env.PORT ?? 3000}]`)
    });

    this.io = new skio.Server(express_server, {
      cors: SocketCors
    })
    console.log(`[Socket.io] Server Cors Settings: \n  origin: ${SocketCors.origin}\n  Methods: ${SocketCors.methods}\n`)
    console.log(`[Socket.io] Server is Running on Port: [${process.env.PORT ?? 3000}]`)
  }
}
