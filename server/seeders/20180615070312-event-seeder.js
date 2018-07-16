
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Events', [
    {
      name: 'Andela Meetup',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: '2018-07-20',
      startDate: '2018-07-20',
      endDate: '2018-07-21',
      userId: 2,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Wakanda Annual Meeting',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: '2018-07-20',
      startDate: '2018-07-20',
      endDate: '2018-07-21',
      userId: 1,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Okorobi Meeting',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: '2018-07-20',
      startDate: '2018-07-20',
      endDate: '2018-07-21',
      userId: 1,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Crazians Meetup',
      purpose: 'Teaching teens how to code',
      note: 'This is to introduce code to teens',
      eventDate: '2018-07-20',
      startDate: '2018-07-20',
      endDate: '2018-07-21',
      userId: 1,
      centerId: 1,
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Events', null, {})
};
