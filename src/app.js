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
    
    // JSON parsing error handler
    this.server.use((err, request, response, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return response.status(400).json({
          error: 'Invalid JSON',
          message: 'The request body contains malformed JSON. Please check your input.',
          details: err.message
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

