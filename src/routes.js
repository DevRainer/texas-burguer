/** biome-ignore-all assist/source/organizeImports: import order managed separately */
import { Router } from 'express';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import CategoryController from './app/controllers/CategoryController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/Products', authMiddleware,upload.single('file'), ProductController.store);
routes.get('/Products', authMiddleware, ProductController.index);

routes.post('/Categories', authMiddleware, CategoryController.store);
routes.get('/Categories', authMiddleware, CategoryController.index);

export default routes;

/*
// Metodo HTTP: POST
// Tipos de parametros:
// Query Params: ?teste=1 (Filtros, ordenação, paginação, ...)
// Route Params: /users/1 (Identificar um recurso na alteração ou remoção)
// Body Params: { "name": "Rainer", "email": "

POST -> CRIAR
PUT /PACH-> ALTERAR/ATUALIZAR
GET -> BUSCAR/RECUPERAR
DELETE -> DELETAR
*/