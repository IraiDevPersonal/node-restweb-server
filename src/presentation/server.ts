import express, { Router } from "express";
import path from "path";
import { envs } from "../config/envs";

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor({ port, routes, publicPath = envs.PUBLIC_PATH }: Options) {
    this.port = port;
    this.routes = routes;
    this.publicPath = publicPath;
  }

  async start() {
    // middelwares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoder

    // public Folder
    this.app.use(express.static(this.publicPath));

    // Router
    this.app.use(this.routes);

    // esto ayuda al router de los SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}
