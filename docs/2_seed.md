# my thoughts on the seeding
  database seeding can be useful for having data when running the app locally. having default values is really nice when a developer has a fresh installation to verify everything. seeded data can also optionally be leveraged by the testing framework. another benefit of seeding is if there is a set of data that is required to be in the database (I.E a list of categories).

# why seed the database

  options provided in the [backend](https://github.com/ztoolson/web-homework/blob/master/elixir/backend.md) are:
  - implement provided seeds.exs file
  - write a .sql file that can be ingested by database

## why selecting to use seeds.exs file
  i selected to implement the provided seed file. i didn't feel strongly either way about the approach, but i figured since phoenix provided a convention and place for seeding data, following the recommended way would be more discoverable by other developers. 

  - phoenix convention is already provided
  - seeds.exs file can be leveraged to run before tests in the test_helper.exs file (note: i prefer to have each unit test be isolated and separated)

## why did i choose to implement seed database requirement first
  - useful for having data on manually testing locally
  - good to get familiar with the data model

## implementation notes
  - the data in the seeds file is meant for development data. i've also seen seed data be used for set production data, but i didn't think that really made sense with users, transactions. it might make sense for merchants but i'm assuming that we won't support a finite set of merchants.
  - i chose the easiest way forward with hard coding database data. i've seen in ruby the faker gem used for generating more random data. this can be usefull if needing more than a handful of records.
  - wanted it to be idempotent to always have the seed data be consistant. this is achieved through dropping all data before inserting. this also could be achieved using a `insert_or_update` function which requires a read of the model before the insert. i chose to just drop all data since we are working with hard coded seed data.

## future thoughts / needs
  - expanding the seeds.exs file with something more robust could be useful if doing performance testing
  - if the seeds are used by the testing framework, and changes to the seed file could potentially cause tests to fail (depending on the changes and how the tests are written).

