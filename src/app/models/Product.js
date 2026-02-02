import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
 
  return super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        category_id: Sequelize.INTEGER,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
      },
    );
 
  }
  static associate(models) {
    this.belongsTo(models.Category, { 
      foreignKey: 'category_id', 
      as: 'category' });
  }
}

export default Product;
