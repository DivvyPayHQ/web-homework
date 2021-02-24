#!/bin/bash
# Docker entrypoint script.

# Wait until Postgres is ready
while ! pg_isready -q -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER
do
  echo pg_isready -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER
  echo $(pg_isready -h $POSTGRES_HOST -p 5432 -U $POSTGRES_USER)
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $POSTGRES_DATABASE"` ]]; then
  echo "Database $POSTGRES_DATABASE does not exist. Creating..."
  mix ecto.create
  mix ecto.migrate
  mix run priv/repo/seeds.exs
  echo "Database $POSTGRES_DATABASE created."
fi

exec mix phx.server
