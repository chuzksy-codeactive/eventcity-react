module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false, validate: { isInt: true } },
    location: { type: DataTypes.STRING, allowNull: false },
    facilities: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    imageName: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING }
  });

  Center.associate = (models) => {
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
    });
  };

  return Center;
};
