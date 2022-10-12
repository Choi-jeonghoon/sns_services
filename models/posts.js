const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // id: {
        //   autoIncrement: true,
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   unique: true,
        // },
        content: {
          type: Sequelize.STRING(300),
          allowNull: true,
        },
        img: {
          type: Sequelize.STRING(300),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Post',
        tableName: 'Posts',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        //timestamps,paranoid를 true 주어졌으므로 생성,업뎃,삭제 컬럼이 생성됨.
      },
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};
