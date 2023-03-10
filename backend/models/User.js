const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        id: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        pw: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        nickName: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING(11),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING(100),
          allowNull: false,
        }
      },
      {
        // 두번째 객체 인수는 테이블 자체에 대한 설정
        sequelize /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */,
        timestamps: false /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */,
        underscored: false /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */,
        modelName: 'User' /* 모델 이름을 설정. */,
        tableName: 'user' /* 데이터베이스의 테이블 이름. */,
        paranoid: false /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */,
        charset: 'utf8' /* 인코딩 */,
        collate: 'utf8_general_ci',
      }
    );
  }

  // 다른 모델과의 관계
  static associate(db) {
    db.User.belongsToMany(db.Challenge, {
      foreignKey: 'User_id',
      through: 'challenge_user_join',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    db.User.belongsToMany(db.MatePost, {
      foreignKey: 'User_id',
      as: 'posts',
      through: 'matePost_user_join',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.User.hasMany(db.MatePost, {
      foreignKey: 'User_nickName',
      sourceKey: 'nickName',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    // db.User.hasMany(db.Challenge, {
    //   foreignKey: 'User_nickName',
    //   sourceKey: 'nickName',
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade',
    // });

    db.User.hasMany(db.Chat, {
      foreignKey: 'User_nickName',
      sourceKey: 'nickName',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.User.hasMany(db.Proof, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

module.exports = User;
