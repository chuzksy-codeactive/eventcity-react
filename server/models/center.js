module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: { type: DataTypes.STRING, required: true },
    capacity: { type: DataTypes.INTEGER, required: true, validate: { isInt: true } },
    location: { type: DataTypes.STRING, required: true },
    facilities: { type: DataTypes.STRING, required: true },
    type: { type: DataTypes.STRING, required: true },
    price: { type: DataTypes.STRING, required: true },
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
