// biome-ignore assist/source/organizeImports: false positive
import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js";
import databaseConfig from "../config/database.cjs";
import User from "../app/models/User.js";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.connection = null;
    this.init()
      .then(() => {
        this.mongo();
      })
      .catch((err) => {
        console.error("Database init failed:", err);
        // Continue anyway for dev
      });
  }

  async init() {
    this.connection = new Sequelize(databaseConfig);

    // Inicializar todos os modelos
    for (const model of models) {
      model.init(this.connection);
    }

    // Associar modelos após todos estarem inicializados
    for (const model of models) {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    }

    // Sync tables for dev (auto-create if missing)
    if (process.env.NODE_ENV !== "production") {
      await this.connection.sync({ force: false }).catch((err) => {
        console.error("Sync failed (tables may already exist):", err.message);
      });
    }

    try {
      await this.connection.authenticate();
      console.log("Postgres connection established successfully.");
    } catch (error) {
      console.error("Postgres unable to connect:", error.message);
      console.log(
        "Server will continue without Postgres for frontend testing.",
      );
      // Do NOT process.exit(1) - allow server to run
    }
  }
  async mongo() {
    try {
      const mongoUri = `mongodb://${process.env.MONGO_HOST || "localhost"}:${process.env.MONGO_PORT || 27017}/${process.env.MONGO_DB || "texasburguer"}`;
      await mongoose.connect(mongoUri);
      console.log("MongoDB connection established successfully.");
    } catch (error) {
      console.error("MongoDB unable to connect:", error.message);
      // Continue without MongoDB if not critical
    }
  }
}

export default new Database();
