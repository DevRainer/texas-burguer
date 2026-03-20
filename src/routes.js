/** biome-ignore-all assist/source/organizeImports: import order managed separately */
import { Router } from "express";
import SessionController from "./app/controllers/SessionController.js";
import UserController from "./app/controllers/UserController.js";
import CategoryController from "./app/controllers/CategoryController.js";
import ProductController from "./app/controllers/ProductController.js";
import OrderController from "./app/controllers/OrderContoller.js";
import multer from "multer";
import multerConfig from "./config/multer.cjs";
import authMiddleware from "./app/middlewares/auth.js";
import adminMiddleware from "./app/middlewares/admin.js";

const routes = new Router();

const upload = multer(multerConfig);

// Allow JSON requests (no file) or multipart/form-data with file field "file"
const conditionalUpload = (req, res, next) => {
  const contentType = (req.headers["content-type"] || "").toString();
  if (contentType.startsWith("multipart/form-data")) {
    return upload.single("file")(req, res, next);
  }
  return next();
};

routes.post("/users", UserController.store);
routes.get("/users", UserController.index);

// login (plural) + alias (singular)
routes.post("/session", SessionController.store);

routes.use(authMiddleware);
routes.post(
  "/Products",
  adminMiddleware,
  conditionalUpload,
  ProductController.store,
);
routes.put(
  "/Products/:id",
  adminMiddleware,
  conditionalUpload,
  ProductController.update,
);
routes.get("/Products", ProductController.index);

// lowercase aliases (Insomnia collection may use lowercase paths)
routes.post(
  "/products",
  adminMiddleware,
  conditionalUpload,
  ProductController.store,
);
routes.put(
  "/products/:id",
  adminMiddleware,
  conditionalUpload,
  ProductController.update,
);
routes.get("/products", ProductController.index);

routes.post(
  "/Categories",
  adminMiddleware,
  conditionalUpload,
  CategoryController.store,
);
routes.put(
  "/Categories/:id",
  adminMiddleware,
  conditionalUpload,
  CategoryController.update,
);
routes.get("/Categories", CategoryController.index);

// lowercase aliases (Insomnia collection may use lowercase paths)
routes.post(
  "/categories",
  adminMiddleware,
  conditionalUpload,
  CategoryController.store,
);
routes.put(
  "/categories/:id",
  adminMiddleware,
  conditionalUpload,
  CategoryController.update,
);
routes.get("/categories", CategoryController.index);

routes.post("/Orders", adminMiddleware, OrderController.store);
routes.get("/Orders", adminMiddleware, OrderController.index);
routes.get("/Orders/:id", adminMiddleware, OrderController.show);
routes.put("/Orders/:id", adminMiddleware, OrderController.update);
routes.put("/Orders/:id/status", adminMiddleware, OrderController.updateStatus);
routes.post(
  "/Orders/:id/advance",
  adminMiddleware,
  OrderController.advanceStatus,
);
routes.get(
  "/Orders/status/labels",
  adminMiddleware,
  OrderController.getStatusLabels,
);
routes.delete("/Orders/:id", adminMiddleware, OrderController.delete);

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
