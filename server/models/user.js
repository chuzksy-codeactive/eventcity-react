module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 25]
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 25]
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 25]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 25]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    },
    imageName: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Event, {
      foreignKey: 'userId'
    });
  };
  return User;
};
