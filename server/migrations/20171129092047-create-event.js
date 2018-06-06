module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      purpose: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.TEXT,
      },
      eventDate: {
        type: Sequelize.DATEONLY,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        refereces: {
          key: 'id',
          model: 'Users',
          as: 'userId'
        },
      },
      centerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        refereces: {
          key: 'id',
          model: 'Centers',
          as: 'centerId'
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Events'),
};
