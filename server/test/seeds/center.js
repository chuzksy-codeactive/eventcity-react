const center = {
  name: 'Mumucious Events',
  capacity: '20000',
  location: 'Ikeja',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: 'Hall',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const center2 = {
  name: 'Grailland Halls',
  capacity: '20000',
  location: 'Ikeja',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: 'Hall',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const noCenterName = {
  name: '',
  capacity: '20000',
  location: 'Ikeja',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: 'Hall',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const noCapacity = {
  name: 'Grailland Hall',
  capacity: '',
  location: 'Ikeja',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: 'Hall',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const noLocation = {
  name: 'Grailland Hall',
  capacity: '20000',
  location: '',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: 'Hall',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const noCenterType = {
  name: 'Grailland Hall',
  capacity: '20000',
  location: 'Ikeja',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: '',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const noPrice = {
  name: 'Grailland Hall',
  capacity: '20000',
  location: 'Ikeja',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: 'Hall',
  price: '',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const noFacilities = {
  name: 'Grailland Hall',
  capacity: '20000',
  location: 'Ikeja',
  facilities: '',
  type: 'Hall',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const centerWithSameName = {
  name: 'Grailland Hall',
  capacity: '20000',
  location: 'Shomolu',
  facilities: 'Chairs, Air Conditions, Canopies',
  type: 'Class room',
  price: '300000',
  imageUrl: 'http://www.fedracongressi.com/fedra/how-location-influences-the-success-of-your-event/'
};

const centerSeeds = {
  center,
  center2,
  noCenterName,
  noCapacity,
  noLocation,
  noFacilities,
  noCenterType,
  noPrice,
  centerWithSameName
};

module.exports = centerSeeds;
