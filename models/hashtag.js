const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Hashtag",
        tableName: "Hashtags",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        //timestamps,paranoid를 true 주어졌으므로 생성,업뎃,삭제 컬럼이 생성됨.
      }
    );
  }
  static associate(db) {}
};
