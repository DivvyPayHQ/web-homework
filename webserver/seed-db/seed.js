const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
  database: {
    name: 'graphql'
  },
  dropDatabase: false
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve('./seed-db/seed-data'), {
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
});

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error', err);
  });
