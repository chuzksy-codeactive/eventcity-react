module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: { type: DataTypes.STRING, required: true },
    purpose: { type: DataTypes.STRING, required: true },
    note: { type: DataTypes.TEXT, required: true },
    eventDate: { type: DataTypes.DATEONLY, required: true },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Event.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE',
    });
  };
  return Event;
};
