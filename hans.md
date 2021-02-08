## TODO

- Fix Apollo cache update issue where delelting a user does not trigger React to update
- Add charts to dashboard route

## React Front End:

- Used Formik and Yup for forms
- Switched to CRA so I can get Typescript for free to take advantage of the strongly typed API using Apollo code gen
- RTL testing using snapshots and event triggering
- Switched from `.gql` files to components declaring what they need
- Partial CRUD operations on Users (List, Create, Delete), Merchants (List, Create) and Transactions (List, Create)
- Demonstrated FP skillset in `transactionsPage.tsx` to handle possible _null_ and/or _undefined_ values using the `fp-ts` library

## Expess BE

- Created a `Dockerfile` and `docker-compose.yml` to demonstrate my DevOps knowledge

## Elixir Back End:

- Possible bug with API where a Transaction can be _both_ a debit & credit. Consider making a `PaymentMethod` union type.
- Resolver tests using factory for data gen
- Switched mutations to use InputTypes for cleaner interface and to make usage on FE easier. Also made certain update fields optional.
- Fixed bug with Transaction schema leaving out :credit from changeset causing it to always default to _false_
