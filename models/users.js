const Sequelize = require('sequelize');
// const DataTypes = require('sequelize');
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
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        //로컬로그인
        provider: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: 'local', //기본적으로 로컬로그인으로 가정했기때문
        },
        //sns 로그인
        snsId: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },

      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'Users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        //timestamps,paranoid를 true 주어졌으므로 생성,업뎃,삭제 컬럼이 생성됨.
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follower',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followings',
      through: 'Follower',
    });
  }
};
