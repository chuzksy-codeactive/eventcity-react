module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: { type: DataTypes.STRING, allowNull: false },
    purpose: { type: DataTypes.STRING, allowNull: false },
    note: { type: DataTypes.TEXT, allowNull: false },
    eventDate: { type: DataTypes.DATEONLY, allowNull: false },
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
