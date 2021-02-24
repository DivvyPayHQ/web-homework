FROM elixir:latest

RUN apt-get update && \
  apt-get install -y postgresql-client

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
COPY . /app
WORKDIR /app

# Install hex package manager
RUN mix local.hex --force
Run mix local.rebar --force

# Compile the project
RUN mix do compile
RUN chmod +x /app/entrypoint.sh
RUN chmod +x /app/test-entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
