import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users',
      },
    );
  }
}

export default User;
