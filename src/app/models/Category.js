import { DataTypes, Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://localhost:3001/category-file/${this.path}`;
          }
        },
      },
      {
        sequelize,
        tableName: 'categories',
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products',
    });
  }
}

export default Category;

