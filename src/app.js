import './database/index.js';
import express from 'express';
import fileRoutesConfig from './config/fileRoutes.cjs';
import routes from './routes.js';


class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/files', fileRoutesConfig);
    this.server.use('/category-file', fileRoutesConfig);

  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

