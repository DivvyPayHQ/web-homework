defmodule Homework.Repo do
  use Ecto.Repo,
    otp_app: :homework,
    adapter: Ecto.Adapters.Postgres
end
