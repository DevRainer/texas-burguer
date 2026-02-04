// biome-ignore assist/source/organizeImports: false positive
import { Sequelize } from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import databaseConfig from '../config/database.cjs';
import User from '../app/models/User.js';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.connection = null;
    this.init();
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

    try {
      await this.connection.authenticate();
      console.log('Connection to database established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error.message);
    }
  }
}

export default new Database();

