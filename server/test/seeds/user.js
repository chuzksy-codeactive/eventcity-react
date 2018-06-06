const user = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
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
  username: 'iffy',
  firstname: 'onuchukwu',
  lastname: 'ifeanyi',
  email: 'iffy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const noUsername = {
  username: '',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const noFirstname = {
  username: 'chuzksy',
  firstname: '',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};
const noLastname = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: '',
  email: 'chuzksy@yahoo.com',
  password: 'password',
  confirmPassword: 'password'
};

const noEmail = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: '',
  password: 'password',
  confirmPassword: 'password'
};

const noPassword = {
  username: 'chuzksy',
  firstname: 'chika',
  lastname: 'onuchukwu',
  email: 'chuzksy@yahoo.com',
  password: '',
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
  userWithSameEmail,
  userWithShortUsername,
  validUser,
  validUser2,
  noUsername,
  noFirstname,
  noLastname,
  noEmail,
  noPassword,
  passwordMissMatch
};

module.exports = userSeeds;

