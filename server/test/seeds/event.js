const event = {
  name: 'Okorobi Monthly Meeting',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: '2018-12-20',
  startDate: '2018-12-20',
  endDate: '2018-12-22',
  userId: 1,
  centerId: 1,
};

const noName = {
  name: null,
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: '2018-07-20',
  startDate: '2018-07-20',
  endDate: '2018-07-22',
  userId: 1,
  centerId: 1,
};

const noPurpose = {
  name: 'Andela Meetup',
  purpose: null,
  note: 'This is to introduce code to teens',
  eventDate: '2018-07-20',
  startDate: '2018-07-20',
  endDate: '2018-07-22',
  userId: 1,
  centerId: 1,
};
// && webpack --config ./client/config/webpack.prod.js -p
const noNote = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: null,
  eventDate: '2018-07-20',
  startDate: '2018-07-20',
  endDate: '2018-07-22',
  userId: 1,
  centerId: 1,
};

const noUserId = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: '2018-07-20',
  startDate: '2018-07-20',
  endDate: '2018-07-22',
  userId: null,
  centerId: 1,
};

const noCenterId = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: '2018-07-20',
  startDate: '2018-07-20',
  endDate: '2018-07-22',
  userId: 1,
  centerId: null,
};

const noEventDate = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: null,
  userId: 1,
  centerId: 1,
};

const eventWithSameDate = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: '2018-12-20',
  startDate: '2018-12-20',
  endDate: '2018-12-22',
  userId: 1,
  centerId: 1,
};
const eventToUpdate = {
  name: 'Teens code',
  purpose: 'Teaching teens how to code',
  note: 'Andela will be teaching teens how to code',
  eventDate: '2018-07-24',
  startDate: '2018-07-24',
  endDate: '2018-07-26',
  userId: 1,
  centerId: 2,
};

const eventSeeds = {
  event,
  noName,
  noPurpose,
  noNote,
  noUserId,
  noCenterId,
  noEventDate,
  eventWithSameDate,
  eventToUpdate
};

module.exports = eventSeeds;
