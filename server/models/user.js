module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, required: true },
    firstname: { type: DataTypes.STRING, required: true },
    lastname: { type: DataTypes.STRING, required: true },
    password: { type: DataTypes.STRING, required: true },
    email: { type: DataTypes.STRING, required: true, validate: { isEmail: true } },
    role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
    imageName: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING }
  });

  User.associate = (models) => {
    User.hasMany(models.Event, {
      foreignKey: 'userId',
      as: 'events'
    });
  };
  return User;
};
