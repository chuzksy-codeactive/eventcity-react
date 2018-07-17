export default {
  id: 4,
  name: 'Kizitos Place',
  capacity: 2000,
  location: 'Ikeja',
  price: 300000,
  facilities: 'Chairs, Tables, ACs, Security',
  type: 'Hall',
}
export const royalGate = {
  id: 1,
  name: "Royal Gate",
  price: 300000,
  capacity: 900,
  location: "Lagos",
  facilities: "security",
  type: "Garden"
};

export const dartEventHall = {
  id: 2,
  name: "Dart Event Hall",
  price: 600000,
  capacity: 300,
  location: "Lagos",
  facilities: "security",
  type: "Garden",
  Events: [
    {
      id: 1,
      name: "Party",
      startDate: "2/3/2009",
      endDate: "2/3/2009"
    }
  ]
};

export const centers = [royalGate, dartEventHall];
