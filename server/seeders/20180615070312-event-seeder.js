
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Events', [
    {
      name: 'Andela Meetup',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: new Date('July 21, 2018 01:15:00'),
      userId: 1,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Wakanda Annual Meeting',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: new Date('July 21, 2018 01:15:00'),
      userId: 1,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Okorobi Meeting',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: new Date('July 21, 2018 01:15:00'),
      userId: 1,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Crazians Meetup',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: new Date('July 21, 2018 01:15:00'),
      userId: 1,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Events', null, {})
};
