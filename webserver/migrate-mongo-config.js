// In this file you can configure migrate-mongo

module.exports = {
  mongodb: {
    url: 'mongodb://localhost:27017',
    databaseName: 'graphql',
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true // removes a deprecating warning when connecting
    }
  },
  // The migrations directory, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'db-init',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration directory
  migrationFileExtension: '.js'
}
