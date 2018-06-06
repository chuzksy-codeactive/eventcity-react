const event = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: new Date('July 21, 2018 01:15:00'),
  userId: 1,
  centerId: 1,
};

const noName = {
  name: '',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: new Date('July 21, 2018 01:15:00'),
  userId: 1,
  centerId: 1,
};

const noPurpose = {
  name: 'Andela Meetup',
  purpose: '',
  note: 'This is to introduce code to teens',
  eventDate: new Date('July 21, 2018 01:15:00'),
  userId: 1,
  centerId: 1,
};

const noNote = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: '',
  eventDate: new Date('July 21, 2018 01:15:00'),
  userId: 1,
  centerId: 1,
};

const noUserId = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: new Date('July 21, 2018 01:15:00'),
  userId: null,
  centerId: 1,
};

const noCenterId = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: new Date('July 21, 2018 01:15:00'),
  userId: 1,
  centerId: null,
};

const noEventDate = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: null,
  userId: 1,
  centerId: null,
};

const eventWithSameDate = {
  name: 'Andela Meetup',
  purpose: 'Teaching teens how to code',
  note: 'This is to introduce code to teens',
  eventDate: new Date('July 21, 2018 01:15:00'),
  userId: 1,
  centerId: 1,
};
const eventToUpdate = {
  name: 'Teens code',
  purpose: 'Teaching teens how to code',
  note: 'Andela will be teaching teens how to code',
  eventDate: new Date('July 22, 2018 01:15:00'),
  userId: 1,
  centerId: 1,
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
