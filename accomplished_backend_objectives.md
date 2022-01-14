# Objectives

## 1. Write filtering options for transactions, users, and/or merchants

I tried to create a pattern of having each context pass each of their queries through a `filter__SCHEMA__` module belonging to the schema
that itself was modular in design. This would allow for additional filters to be added in an easy fashion avoiding clutter and duplicate code.

Each `search_by_name` function makes use of some built in postgres fuzzy search functionality brought in by a
[migration](elixir/priv/repo/migrations/20220112203323_add_fuzzy_extensions.exs) and orders results by the
[Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance). I am not going to pretend to be cooler than I really am and all
credit goes to [this](https://fullstackphoenix.com/tutorials/fuzzy-search-in-phoenix-liveview) post online.

- [Companies](elixir/lib/homework/companies.ex)
  - [filters](elixir/lib/homework/companies/filter_companies.ex) ::: [test](elixir/test/homework/companies/companies_test.exs)
  - [search by name](elixir/lib/homework/companies/search_companies_by_name.ex) ::: [test](elixir/test/homework/companies/search_companies_by_name_test.exs)
- [Merchants](elixir/lib/homework/merchants.ex)
  - [filters](elixir/lib/homework/merchants/filter_merchants.ex) ::: [test](elixir/test/homework/merchants/merchants_test.exs)
  - [search by name](elixir/lib/homework/merchants/search_merchants_by_name.ex) ::: [test](elixir/test/homework/merchants/search_merchants_by_name_test.exs)
- [Transactions](elixir/lib/homework/transactions.ex)
  - [filters](elixir/lib/homework/transactions/filter_transactions.ex) ::: [test](elixir/test/homework/transactions/transactions_test.exs)
  - [search by max min](elixir/lib/homework/transactions/search_transactions_by_max_min.ex) ::: [test](elixir/test/homework/transactions/search_transactions_by_max_mix_test.exs)
- [Users](elixir/lib/homework/users.ex)
  - [filters](elixir/lib/homework/users/filter_users.ex) ::: [test](elixir/test/homework/users/user_test.exs)
  - [search by dob](elixir/lib/homework/users/search_users_by_dob.ex) ::: [test](elixir/test/homework/users/search_users_by_dob_test.exs)
    - Created a [migration](elixir/priv/repo/migrations/20220112203414_alter_users_dob_to_date.exs)
      file to change a `users.dob` from a String to a Date. Realized that if
      this was done on a project already in production there would need to be
      care taken to migrate and backfill that columns data type.
  - [search by name](elixir/lib/homework/users/search_users_by_name.ex) ::: [test](elixir/test/homework/users/search_users_by_name_test.exs)

## 2. Write a new schema, queries, and mutations to add companies to the app

Created a [migration](elixir/priv/repo/migrations/20220112203437_create_companies.exs) file and updated the schemas accordingly.

Took the approach of changing a companies available credit within a [transactions changeset](elixir/lib/homework/transactions/transaction.ex#L68)

I did get a little stumped and didn't want to investigate too deeply into how to handle when updating a transactions `company_id` because that would impact
the new/old parent companies available credit. . . :shrug: So for now that isn't allowed and is enforced within the [transactions changeset](elixir/lib/homework/transactions/transaction.ex#L47) too.

- [Companies GraphQL Resolver](elixir/lib/homework_web/resolvers/companies_resolver.ex)
- [Companies GraphQL Schema](elixir/lib/homework_web/schemas/companies_schema.ex)

## 3. Seed the database

Created a [seeds.exs](elixir/priv/repo/seeds.exs).

Enforced not running seeds file from mix task in prod :shrug:.

Additional option to delete local database `mix run priv/repo/seeds.exs --delete-all`

## 4. Write tests for the resolvers & mutations

Resolvers are pretty minimum with logic -- all logic is handled within the corresponding schemas context and the filters module I alluded to earlier. Because of this
I chose not to write test for the resolvers as I felt that test coverage for that piece in the pipe was covered by the following test. One thing I did change with
regards to the resolvers for each schema that has an associated child was change how each child is queried/acquired by using `Absinthe.REsolution.Helpers.batch/3`.
This was in an attempt to avoid harmful N+1 queries :shrug: [Companies Transactions Example](elixir/lib/homework_web/resolvers/companies_resolver.ex#L24)

- [Companies Test](elixir/test/homework_web/schema/companies_test.exs)
- [Merchants Test](elixir/test/homework_web/schema/merchants_test.exs)
- [Transactions Test](elixir/test/homework_web/schema/transactions_test.exs)
- [Users Test](elixir/test/homework_web/schema/users_test.exs)

## 5. Allow the mutations to handle a decimal amount for transactions (the database stores it as cents)

Since I figured the front end logic didn't need to know or care about how a transactions amount is stored within the database I tried to take the approach of supporting both an integer and a decimal/float
value when creating/updating a transaction. As well as when searching a transaction by its min and max value. This was done by using an Absinthe Scalar and creating my own called Amount.

- [Absinthe Scalar: Amount](elixir/lib/homework_web/schemas/transactions_schema.ex#L12)

A transactions `amount` is always received by the front end as a decimal/float. This was accomplished with a simple transformation within the transactions resolver.

- [transactions_resolver](elixir/lib/homework_web/resolvers/transactions_resolver.ex#L8)

# Bonus Points

## 1. Find the bug with transactions

Bug with a transactions default credit value being :false

Accounted for fix with [test callout](elixir/test/homework/transactions/transactions_test.exs#L59)

## 2. Find the security issue

:thinking: . . . Not sure I got to this one. One obvious thing that stood out to me was that the `/graphiql` endpoint has zero authentication or authorization being enforced.

## 3. Add/improve the docs and @spec to functions

Added @specs and @doc tags throughout.

Organized file structure and project where I saw fit.

Simplified complex test structure through use of [factory](elixir/test/support/factory.ex)
