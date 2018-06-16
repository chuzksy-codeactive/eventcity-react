const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      username: 'chuzksy',
      firstname: 'chika',
      lastname: 'onuchukwu',
      email: 'chuzksy@yahoo.com',
      password: bcrypt.hashSync('password'),
      role: 'user',
      imageName: 'no_image.png',
      imageUrl: 'no_image_url',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    }, {
      username: 'ifeanyi',
      firstname: 'michael',
      lastname: 'onuchukwu',
      email: '2gen2@yahoo.com',
      password: bcrypt.hashSync('password'),
      role: 'user',
      imageName: 'no_image.png',
      imageUrl: 'no_image_url',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    }, {
      username: 'chibumma',
      firstname: 'rosemary',
      lastname: 'onuchukwu',
      email: 'mary@yahoo.com',
      password: bcrypt.hashSync('password'),
      role: 'user',
      imageName: 'no_image.png',
      imageUrl: 'no_image_url',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    }, {
      username: 'chukwudi',
      firstname: 'charles',
      lastname: 'onuchukwu',
      email: 'charles@yahoo.com',
      password: bcrypt.hashSync('password'),
      role: 'user',
      imageName: 'no_image.png',
      imageUrl: 'no_image_url',
      createdAt: '2018-12-12',
      updatedAt: '2018-12-12'
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
