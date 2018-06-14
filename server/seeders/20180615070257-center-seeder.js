

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Centers', [
    {
      name: 'Grailland Hall',
      capacity: '20000',
      location: 'Ikeja',
      facilities: 'Chairs, Air Conditions, Canopies',
      type: 'Hall',
      price: '300000',
      imageName: '40dafdd05af5dc15a67fda1fb0946167',
      imageUrl: 'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Imole Grand Hall',
      capacity: '30000',
      location: 'Agege',
      facilities: 'Chairs, Air Conditions, Canopies',
      type: 'Banquet',
      price: '500000',
      imageName: '40dafdd05af5dc15a67fda1fb0946167',
      imageUrl: 'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Starfield Events',
      capacity: '10000',
      location: 'Victoria Island',
      facilities: 'Chairs, Air Conditions, Canopies, Security, Generators, Restrooms',
      type: 'Hall',
      price: '300000',
      imageName: '40dafdd05af5dc15a67fda1fb0946167',
      imageUrl: 'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Wakandas Place',
      capacity: '5000',
      location: 'Wakanda',
      facilities: 'Chairs, Air Conditions, Canopies, Deep Freezers',
      type: 'Hall',
      price: '300000',
      imageName: '40dafdd05af5dc15a67fda1fb0946167',
      imageUrl: 'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    },
    {
      name: 'Andela Eventrys',
      capacity: '10000',
      location: 'Ikorudo Road',
      facilities: 'Chairs, Air Conditions, Canopies, Stage, Security, Deep Freezers',
      type: 'Hall',
      price: '300000',
      imageName: '40dafdd05af5dc15a67fda1fb0946167',
      imageUrl: 'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Centers', null, {})
};
