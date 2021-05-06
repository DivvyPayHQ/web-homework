defmodule Homework.Repo.Migrations.AddFuzzySearch do
  use Ecto.Migration

  def up do
    execute("CREATE EXTENSION pg_trgm")
    execute("CREATE EXTENSION fuzzystrmatch")
  end

  def down do
    execute("DROP EXTENSION fuzzystrmatch")
    execute("DROP EXTENSION pg_trgm")
  end
end
