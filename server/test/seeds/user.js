const user = {
  username: 'monkeys',
  firstname: 'chimpanzee',
  lastname: 'gorilla',
  email: 'gorilla@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};
const user2 = {
  username: 'chikason',
  firstname: 'chimpanzee',
  lastname: 'gorilla',
  email: 'chikason@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const userToUpdate = {
  username: 'chuzksy',
  firstname: 'Onuchukwu',
  lastname: 'ifeanyi',
  email: 'iffy2gen2@gmail.com',
  password: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const userWithSameEmail = {
  username: 'eberes',
  firstname: 'ibiam',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const userWithShortUsername = {
  username: 'iffy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const validUser = {
  username: 'eberes',
  firstname: 'ebere',
  lastname: 'ibiam',
  email: 'ibiam.ebere@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const validUser2 = {
  username: 'mummyEbby',
  firstname: 'ebere',
  lastname: 'ibiam',
  email: 'mummy.ebere@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const invalidUser = {
  username: 'iffy',
  firstname: 'onuchukwu',
  lastname: 'ifeanyi',
  email: 'iffy@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const noUsername = {
  username: null,
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const noFirstname = {
  username: 'chuzksy',
  firstname: null,
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};
const noLastname = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: null,
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const noEmail = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: null,
  password: 'password',
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const noPassword = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: null,
  confirmPassword: 'password',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const passwordMissMatch = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password2',
  imageUrl: 'no_image_url',
  imageName: 'no_image.png'
};

const userSeeds = {
  user,
  user2,
  userWithSameEmail,
  userWithShortUsername,
  validUser,
  invalidUser,
  noUsername,
  noFirstname,
  noLastname,
  noEmail,
  noPassword,
  passwordMissMatch,
  userToUpdate,
  validUser2
};

module.exports = userSeeds;

