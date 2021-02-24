# Homework

For backend only applicants, you should only need to deal with files in the `elixir` folder.

You will need to have postgres running.
The easiest way to install postgres is through brew:
`brew install postgres`

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:8000`](http://localhost:8000) from your browser.
You can use [`localhost:8000/graphiql`](http://localhost:8000/graphiql) to make basic graphql queries from your browser.


## Docker

If you want to run this in docker you can do so:
1. run `docker-compose build` from `/elixir` directory of the app.
2. run `docker-compose up web` from `/elixir` directory of the app to start the server.
3. run `docker-compose up test` from `/elixir` directory of the app to run the tests.


This can be particularly helpful if you are running on Windows or are having issues getting postgres or elixir running.

Note, you will have to run `docker-compose build` every time you change code.

Also if you just want to run postgres in docker, you can run `docker-compose up db` to just spin up postgres.

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
  * Absinthe: https://hexdocs.pm/absinthe/overview.html
