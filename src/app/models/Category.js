import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
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
}

export default Category;
