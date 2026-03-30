import cors from 'cors';
import express from 'express';
import fileRoutesConfig from './config/fileRoutes.cjs';
import routes from './routes.js';
import  './database/index.js';

class App {
  constructor() {
    this.server = express();

    this.server.use(cors());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    // JSON parsing error handler
    this.server.use((err, _request, response, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return response.status(400).json({
          error: 'Invalid JSON',
          message:
            'The request body contains malformed JSON. Please check your input.',
          details: err.message,
        });
      }
      next();
    });

    this.server.use('/files', fileRoutesConfig);
    this.server.use('/category-file', fileRoutesConfig);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
