defmodule Homework.Repo.Migrations.CreateFuzzySearchExtensions do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS pg_trgm")
    execute("CREATE EXTENSION IF NOT EXISTS fuzzystrmatch")
  end
end