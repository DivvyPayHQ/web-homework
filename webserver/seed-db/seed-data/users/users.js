const { getObjectId, getObjectIds } = require('mongo-seeding');

const users = [
  {
    id: getObjectId('Raphael'),
    dob: randomDate(),
    firstName: 'Raphael',
    lastName: 'Schneider'
  },
  {
    id: getObjectId('Alex'),
    dob: randomDate(),
    firstName: 'Alex',
    lastName: 'Wood'
  },
  {
    id: getObjectId('David'),
    dob: randomDate(),
    firstName: 'David',
    lastName: 'Ruvacalba'
  },
];

function randomDate() {
  const start = new Date(1900, 0, 1),
    end = new Date(2000, 0, 1)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toUTCString();
}

module.exports = users