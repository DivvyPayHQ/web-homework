# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# My setup notes:
# Postgresql startup:
# in /home/linuxbrew/.linuxbrew/bin
# pg_ctl start -D /home/linuxbrew/.linuxbrew/var/postgres -l logfile
# if connect error try sudo netstat -tlnp and ps -aux | grep postmaster
# createdb
# psql -h localhost -U postgres -d homework_dev
# in shell: createuser postgres -s

# General application configuration
use Mix.Config

config :homework,
  ecto_repos: [Homework.Repo]

# Configures the endpoint
config :homework, HomeworkWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "+IjyxgEncWjAVS+ARMn8qUGkijbmXyEp7YTevKL+sfe0dcpJmaaeNXFW8j/By5i9",
  render_errors: [view: HomeworkWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Homework.PubSub,
  live_view: [signing_salt: "4Ka1Trkx"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Setup for the Money module
config :money,
  default_currency: :USD,
  separator: ",",
  delimiter: ".",
  symbol: false,
  symbol_on_right: false,
  symbol_space: false,
  fractional_unit: true,
  strip_insignificant_zeros: false

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
