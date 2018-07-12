const user = {
  username: 'monkeys',
  firstname: 'chimpanzee',
  lastname: 'gorilla',
  email: 'gorilla@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};
const user2 = {
  username: 'chikason',
  firstname: 'chimpanzee',
  lastname: 'gorilla',
  email: 'chikason@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const userToUpdate = {
  username: 'chuzksy',
  firstname: 'Onuchukwu',
  lastname: 'ifeanyi',
  email: 'iffy2gen2@gmail.com',
  password: 'password'
};

const userWithSameEmail = {
  username: 'eberes',
  firstname: 'ibiam',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const userWithShortUsername = {
  username: 'iffy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const validUser = {
  username: 'eberes',
  firstname: 'ebere',
  lastname: 'ibiam',
  email: 'ibiam.ebere@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const validUser2 = {
  username: 'mummyEbby',
  firstname: 'ebere',
  lastname: 'ibiam',
  email: 'mummy.ebere@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const invalidUser = {
  username: 'iffy',
  firstname: 'onuchukwu',
  lastname: 'ifeanyi',
  email: 'iffy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const noUsername = {
  username: null,
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const noFirstname = {
  username: 'chuzksy',
  firstname: null,
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};
const noLastname = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: null,
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const noEmail = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: null,
  password: 'password',
  confirmPassword: 'password'
};

const noPassword = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: null,
  confirmPassword: 'password'
};

const passwordMissMatch = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password2'
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

